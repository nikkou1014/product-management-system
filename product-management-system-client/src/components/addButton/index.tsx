import { useEffect, useState } from "react";
import { UserCartItem, CurrentCartItem } from "../../constants/interface";

import api from "../../api/cartApi";
import productApi from "../../api/productApi";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";

import "./index.css";

const AddButton = (props: any) => {
  const { userStatus, setAlert, productId, currentCart, setCurrentCart } = props;

  const [productQuantity, setProductQuantity] = useState(0);
  const [inStockQuantity, setInStockQuantity] = useState(0);
  const [isAddVisible, setIsAddVisible] = useState(true);
  const [isCountVisible, setIsCountVisible] = useState(false);

  useEffect(() => {
    const product = currentCart.find((item: any) => item.uuid === productId);
    if (product) {
      setProductQuantity(product.quantity);
      setInStockQuantity(product.inStockQuantity);
    } else {
      setProductQuantity(0);
    }
  }, [productId, currentCart]);

  useEffect(() => {
    setIsAddVisible(productQuantity === 0);
    setIsCountVisible(productQuantity > 0);
  }, [productQuantity]);

  const generateCart = (currentCart: CurrentCartItem[]) => {
    let cart: UserCartItem[] = [];
    for (let i = 0; i < currentCart.length; i++) {
      cart.push({
        uuid: currentCart[i].uuid,
        quantity: currentCart[i].quantity,
        existence: currentCart[i].existence,
      });
    }
    return cart;
  };

  useEffect(() => {
    const userId = document.cookie.substring(5, document.cookie.length);
    const cart = generateCart(currentCart);
    api
      .modCartApi(userId, cart)
      .catch((e) => {
        console.log(e);
      });

  }, [currentCart]);

  const setCount = async (valueAdded: number) => {
    const newCount = productQuantity + valueAdded;
    const newCart = [...currentCart];
    const productIndex = newCart.findIndex((item: any) => item.uuid === productId);
    if (newCount > 0) {
      newCart[productIndex].quantity = newCount;
    } else {
      newCart.splice(productIndex, 1);
    }
    setCurrentCart(newCart);
  };

  const addProduct = async () => {
    if (userStatus !== "SIGNIN") {
      setAlert(true);
    } else {
      const newCart = [...currentCart];
      const response = await productApi.getProductApi(productId);
      const newProduct = { ...response };
      newProduct.quantity = 1;
      newCart.push(newProduct);
      setCurrentCart(newCart);
    }
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        fullWidth
        sx={{
          display: `${(isCountVisible ? "" : "none")}`,
          height: "24px",
          width: "auto",
        }}
      >
        <Button
          onClick={() => setCount(-1)}
          sx={{ color: "#ffffff" }}
          id={"minusButton"}
        >
          -
        </Button>
        <Typography
          sx={{
            height: "24px",
            backgroundColor: "#1976d2",
            color: "#ffffff",
            textAlign: "center",
            fontWeight: "400",
            margin: "0",
            paddingTop: "0",
          }}
        >
          {productQuantity}
        </Typography>
        <Button
          disabled={productQuantity === inStockQuantity}
          onClick={() => setCount(1)}
          sx={{ color: "#ffffff" }}
          id={"addButton"}
        >
          +
        </Button>
      </ButtonGroup>

      <Button
        fullWidth
        sx={{ height: "1.3rem", width: "30%", display: `${(isAddVisible ? "" : "none")}` }}
        variant="contained"
        onClick={addProduct}
      >
        Add
      </Button>
    </>
  );
};

export default AddButton;
