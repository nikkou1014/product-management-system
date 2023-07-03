import { useEffect, useState } from "react";

import SignInModal from "../modal";
import CreateProduct from "../createProduct";
import ProductsDetail from "../productsDetail";
import Products from "../products";
import Cart from "../cart";
import ErrorPage from "../errorPage";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function Home(props: any) {
  const {
    signInOpen,
    handleSignInClose,
    cartOpen,
    handleCartClose,

    modalStatus,
    setModalStatus,
    userStatus,
    setUserStatus,
    userType,
    setUserType,

    setUserCart,
    currentCart,
    setCurrentCart,
    discountCode,
    setDiscountCode,
    prices,
    productsTotalNumber,
    setProductsTotalNumber,
  } = props;

  const [isError, setIsError] = useState(false);
  (window as any).setError = () => setIsError(true);

  const [alert, setAlert] = useState(false);

  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [isProductDetailVisible, setIsProductDetailVisible] = useState(false);
  const [productId, setProductId] = useState("");

  let content;

  if (isError) {
    content = <ErrorPage setIsError={setIsError} />;
  } else if (isProductDetailVisible) {
    content = <ProductsDetail
      userStatus={userStatus}
      alert={alert}
      setAlert={setAlert}
      userType={userType}
      setIsProductDetailVisible={setIsProductDetailVisible}
      productId={productId}
      currentCart={currentCart}
      setCurrentCart={setCurrentCart}
      setIsCreatingProduct={setIsCreatingProduct}
      setIsEditingProduct={setIsEditingProduct}
    />;
  } else if (isCreatingProduct) {
    content = <CreateProduct
      setIsCreatingProduct={setIsCreatingProduct}
      isEditingProduct={isEditingProduct}
      setIsEditingProduct={setIsEditingProduct}
      productId={productId}
    />;
  } else {
    content = <Products
      userStatus={userStatus}
      alert={alert}
      setAlert={setAlert}
      userType={userType}
      // setProductsTotalNumber={setProductsTotalNumber}
      setIsCreatingProduct={setIsCreatingProduct}
      setIsEditingProduct={setIsEditingProduct}
      setIsProductDetailVisible={setIsProductDetailVisible}
      currentCart={currentCart}
      setCurrentCart={setCurrentCart}
      productsTotalNumber={productsTotalNumber}
      setProductId={setProductId}
    />;
  }

  return (
    <Box sx={{
      backgroundColor: "#E5E5E5",
      height: "auto",
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      paddingTop: "4rem",
      paddingBottom: "5rem",
    }}>
      <SignInModal
        open={signInOpen}
        handleClose={handleSignInClose}
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        setUserStatus={setUserStatus}
        setUserCart={setUserCart}
        setUserType={setUserType}
        setAlert={setAlert}
      />

      <Modal open={cartOpen} onClose={handleCartClose}>
        <Box component="main" maxWidth="xs" sx={{
          display: "flex",
          flexDirection: "column",
          marginRight: 0,
          marginLeft: "auto",
          padding: 0,
          width: "25rem",
          height: "100%",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "0",
        }}>
          <Cart
            currentCart={currentCart}
            setCurrentCart={setCurrentCart}
            handleCartClose={handleCartClose}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            prices={prices}
            setProductId={setProductId}
            setIsProductDetailVisible={setIsProductDetailVisible}
          />
        </Box>
      </Modal>

      {content}
    </Box>
  );
}

export default Home;
