import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AddButton from "../addButton";
import api from "../../api/productApi";
import { ProductItem } from "../../constants/interface";

const ProductsDetail = (props: any) => {
  const {
    userStatus,
    alert,
    setAlert,
    userType,
    setIsProductDetailVisible,
    productId,
    currentCart,
    setCurrentCart,
    setIsCreatingProduct,
    setIsEditingProduct,
  } = props;

  const [product, setProduct] = useState({} as ProductItem);

  useEffect(() => {
    const getProductDetail = async (productId: string) => {
      try {
        const response: ProductItem = await api.getProductApi(productId);
        setProduct({ ...response });
      } catch (e) {
        console.log(e);
      }
    };
    getProductDetail(productId);
  }, [productId, setProduct]);

  return (
    <Container sx={{ width: "90%", margin: "auto" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: "0.5rem 0" }}
      >
        <Typography variant="h5" textAlign="start">
          Products Detail
        </Typography>
        <Alert severity="error" sx={{ display: alert ? "" : "none", padding: "2px 16px" }}>
          Please sign in!
        </Alert>
        <IconButton
          onClick={() => {
            setIsProductDetailVisible(false);
          }}
          sx={{ p: "0.8rem", padding: 0 }}
        >
          <ArrowBackIcon sx={{ marginRight: "0.3rem" }} />
          <Typography variant="h5" textAlign="end">Back</Typography>
        </IconButton>
      </Grid>

      <Container sx={{ backgroundColor: "#ffffff", borderRadius: "4px" }}>
        <Grid container direction="row" sx={{ padding: "20px" }}>
          <Grid item xs={7} sx={{ paddingRight: "50px" }}>
            <img
              alt={product.name}
              src={product.imageLink}
              width="100%"
            />
          </Grid>
          <Grid item xs={5} container direction="column" textAlign="start" sx={{ paddingTop: "3rem" }}>
            <Typography sx={{ fontWeight: "500", fontSize: "0.7rem", color: "#6b7280" }}>
              {product.category}
            </Typography>
            <Typography sx={{ fontWeight: "700", fontSize: "1.5rem", color: "#535353" }}>
              {product.name}
            </Typography>
            <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ padding: "0.6rem 0" }}
            >
              <Typography sx={{ fontWeight: "700", fontSize: "1.5rem", color: "#111827" }}>
                ${product.price}
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  marginLeft: "0.5rem",
                  padding: "3px",
                  backgroundColor: "rgba(234, 61, 47, 0.13)",
                  borderRadius: "4px",
                  color: "#EA3D2F",
                  fontSize: "0.7rem",
                  display: (!product.existence || product.inStockQuantity === 0) ? "" : "none"
                }}
              >
                {product.existence ? "Out of Stock" : "Unavailable"}
              </Typography>
            </Grid>
            <Typography sx={{ fontWeight: "500", fontSize: "0.7rem", color: "#6b7280" }}>
              {product.description}
            </Typography>
            <Grid container direction="row" sx={{ marginTop: "2rem" }}>
              <Grid item xs={4}
                sx={{ display: (product.existence && product.inStockQuantity !== 0) ? "" : "none" }}
              >
                <AddButton
                  userStatus={userStatus}
                  setAlert={setAlert}
                  productId={productId}
                  currentCart={currentCart}
                  setCurrentCart={setCurrentCart}
                />
              </Grid>
              <Grid item xs={4} sx={{ display: (userType === "ADMIN") ? "" : "none" }}>
                <Button variant="outlined" sx={{ height: "1.5rem" }}
                  onClick={() => {
                    setIsEditingProduct(true);
                    setIsCreatingProduct(true);
                    setIsProductDetailVisible(false);
                  }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default ProductsDetail;
