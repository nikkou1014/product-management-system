import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./components/home/";
import Header from "./common/header/";
import Footer from "./common/footer/";

import { UserCartItem, CurrentCartItem, Prices } from "././constants/interface";

import userApi from "./api/signInApi";
import productApi from "./api/productApi";

import "./App.css";

function App() {
  const [userStatus, setUserStatus] = useState("LOADING"); // SIGNIN SIGNOUT LOADING
  const [userType, setUserType] = useState(""); // ADMIN CUSTOMER

  const [userCart, setUserCart] = useState<UserCartItem[]>([]);
  const [currentCart, setCurrentCart] = useState<CurrentCartItem[]>([]);
  const [prices, setPrices] = useState<Prices>({
    count: 0,
    subtotal: 0,
    tax: 0,
    discount: 0,
    estimatedTotal: 0,
  });
  const [discountCode, setDiscountCode] = useState("");
  const [productsTotalNumber, setProductsTotalNumber] = useState(0);

  const [signInOpen, setSignInOpen] = useState(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

  const [cartOpen, setCartOpen] = useState(false);
  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  const [modalStatus, setModalStatus] = useState("SIGNIN"); //SIGNIN SIGNUP CHANGEPASSWORD

  const taxRate = 0.1;

  if (!document.cookie) {
    document.cookie = "uuid=null";
  }

  useEffect(() => {
    if (userStatus === "SIGNOUT") {
      setDiscountCode("");
      setUserCart([]);
    }
  }, [userStatus, setDiscountCode, setUserCart]);

  useEffect(() => {
    async function getUser() {
      try {
        const uuid = document.cookie.substring(5, document.cookie.length);
        if (uuid !== "null") {
          const response = await userApi.getUserApi("UUID", uuid);
          if (response === "UNAUTHORIZED") {
            setUserStatus("SIGNOUT");
          } else {
            setUserStatus(response.status);
            setUserType(response.type);
            setUserCart(response.cart);
          }
        } else {
          setUserStatus("SIGNOUT");
        }
      } catch (e) {
        console.log(e);
        (window as any).setError();
        // throw new Error("Get user API error");
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    productApi
      .getProductsTotalNumber()
      .then((response) => { if (response) { setProductsTotalNumber(response); } })
      .catch((e) => {
        console.log(e);
      });
  }, [setProductsTotalNumber]);

  useEffect(() => {
    productApi
      .getProductsListApi(userCart)
      .then((response) => { if (response) { setCurrentCart(response); } })
      .catch((e) => {
        console.log(e);
      });
  }, [userCart]);

  const totalCount = (currentCart: CurrentCartItem[]) => {
    return currentCart.reduce(
      (total, item) => { return item.inStockQuantity === 0 ? (total) : (total + item.quantity); }
      , 0);
  };

  const subTotal = (currentCart: CurrentCartItem[]) => {
    return currentCart.reduce(
      (total, item) => {
        return item.inStockQuantity === 0 ? (total) : (total + item.quantity * item.price);
      }
      , 0);
  };

  useEffect(() => {
    let newPrice: Prices = {
      count: 0,
      subtotal: 0,
      tax: 0,
      discount: 0,
      estimatedTotal: 0,
    };
    newPrice.count = totalCount(currentCart);
    newPrice.subtotal = subTotal(currentCart);
    if (discountCode === "20 DOLLAR OFF") {
      newPrice.discount = 20;
    } else if (discountCode === "20% OFF") {
      newPrice.discount = newPrice.subtotal * 0.2;
    } else {
      newPrice.discount = 0;
    }
    newPrice.tax = newPrice.subtotal * taxRate;
    newPrice.estimatedTotal = newPrice.subtotal + newPrice.tax - newPrice.discount;
    setPrices(newPrice);
  }, [currentCart, setPrices, discountCode]);

  return (
    <Container id="App" sx={{ minHeight: "100vh" }}>
      <CssBaseline />
      <Header
        setUserType={setUserType}
        userStatus={userStatus}
        setUserStatus={setUserStatus}
        handleSignInOpen={handleSignInOpen}
        handleCartOpen={handleCartOpen}
        setModalStatus={setModalStatus}
        prices={prices}
      />
      <Home
        signInOpen={signInOpen}
        handleSignInClose={handleSignInClose}
        cartOpen={cartOpen}
        handleCartClose={handleCartClose}

        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        userStatus={userStatus}
        setUserStatus={setUserStatus}
        userType={userType}
        setUserType={setUserType}

        setUserCart={setUserCart}
        currentCart={currentCart}
        setCurrentCart={setCurrentCart}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        prices={prices}
        productsTotalNumber={productsTotalNumber}
        setProductsTotalNumber={setProductsTotalNumber}
      />
      <Footer />
    </Container>
  );
}

export default App;
