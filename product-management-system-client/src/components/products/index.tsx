import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import api from "../../api/productApi";
import ProductsList from "../productsList";
import { PRODUCTS_PAGE } from "../../constants";
import { ProductItem } from "../../constants/interface";

const Products = (props: any) => {
  const {
    userStatus,
    alert,
    setAlert,
    userType,
    setIsCreatingProduct,
    setIsEditingProduct,
    setIsProductDetailVisible,
    currentCart,
    setCurrentCart,
    productsTotalNumber,
    setProductId,
  } = props;

  const [count, setCount] = useState(2);
  const [order, setOrder] = useState("lastAdded"); // lastAdded, lowToHigh, highToLow
  const [limit, setLimit] = useState(PRODUCTS_PAGE.PRODUCTS_LIST.QUANTITY_PER_PAGE);
  const [page, setPage] = useState(1);
  const [itemData, setItemData] = useState<ProductItem[]>([]);

  const handleOrderChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getItemData = (req: any, callback: Function) => {
    api
      .getProductsByPageApi(req)
      .then((response) => callback(null, response))
      .catch((e) => {
        console.log(e);
        callback(e, null);
      });
  };

  useEffect(() => {
    let reqOrder = {};
    if (order === "lastAdded") {
      reqOrder = { lastModTime: -1 };
    } else if (order === "lowToHigh") {
      reqOrder = { price: 1 };
    } else if (order === "highToLow") {
      reqOrder = { price: -1 };
    }
    let skip = (page - 1) * limit;
    const req = {
      order: reqOrder,
      skip: skip,
      limit: limit,
    };
    getItemData(req, (err: Error, result: any) => {
      setItemData(result);
    });
  }, [order, limit, page, setItemData]);

  useEffect(() => {
    setCount(Math.ceil(productsTotalNumber / limit));
  }, [setCount, productsTotalNumber, limit]);

  return (
    <Container sx={{ width: "90%", height: "", margin: "auto" }}>
      <Grid container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "3rem" }}
      >
        <Grid item>
          <Typography variant="h5" textAlign="start">
            Products
          </Typography>
        </Grid>
        <Grid item sx={{ display: alert ? "" : "none" }}>
          <Alert severity="error" sx={{ padding: "2px 16px" }}>
            Please sign in!
          </Alert>
        </Grid>
        <Grid item>
          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Select
              value={order}
              onChange={handleOrderChange}
              sx={{ height: "2rem", backgroundColor: "#ffffff" }}
            >
              <MenuItem value={"lastAdded"}>Last added</MenuItem>
              <MenuItem value={"lowToHigh"}>Price: low to high</MenuItem>
              <MenuItem value={"highToLow"}>Price: high to low</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={() => setIsCreatingProduct(true)}
              sx={{ height: "2rem", display: (userType === "ADMIN") ? "" : "none", marginLeft: "1rem" }}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        sx={{
          padding: "0.6rem 1.5rem",
          borderRadius: "4px",
          backgroundColor: "#ffffff",
        }}
      >
        <ProductsList
          userStatus={userStatus}
          setAlert={setAlert}
          userType={userType}
          itemData={itemData}
          currentCart={currentCart}
          setCurrentCart={setCurrentCart}
          setProductId={setProductId}
          setIsCreatingProduct={setIsCreatingProduct}
          setIsEditingProduct={setIsEditingProduct}
          setIsProductDetailVisible={setIsProductDetailVisible}
        />
      </Grid>
      <Pagination
        count={count}
        page={page}
        onChange={handlePageChange}
        sx={{ marginTop: "0.8rem" }}
      />
    </Container>
  );
};

export default Products;
