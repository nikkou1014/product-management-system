import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import CartItem from "../cartItem";
import PriceTable from "../priceTable";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Cart = (props: any) => {
  const {
    currentCart,
    setCurrentCart,
    handleCartClose,
    discountCode,
    setDiscountCode,
    prices,
    setProductId,
    setIsProductDetailVisible,
  } = props;

  const [discountCodeInput, setDiscountCodeInput] = useState("");

  const handleDiscountCodeInput = (event: any) => {
    setDiscountCodeInput(event.target.value);
  };

  useEffect(() => {
    setDiscountCodeInput(discountCode);
  }, [discountCode, setDiscountCodeInput]);

  const items = currentCart.map((item: any) => {
    return <CartItem
      key={item.uuid}
      item={item}
      currentCart={currentCart}
      setCurrentCart={setCurrentCart}
      setProductId={setProductId}
      setIsProductDetailVisible={setIsProductDetailVisible}
    />;
  });

  return (
    <Box sx={{ height: "100%" }}>
      {/* header */}
      <Grid container alignItems="center" sx={{
        textAlign: "center",
        height: "7%",
        backgroundColor: "#1976d2",
        color: "#ffffff",
      }}>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "1.3rem",
            marginLeft: "5%",
          }}
        >
          Cart
        </Typography>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "0.8rem",
            marginLeft: "0.3rem"
          }}>
          ({prices.count})
        </Typography>
        <IconButton onClick={handleCartClose} sx={{ color: "#ffffff", marginRight: "5%", marginLeft: "auto" }}>
          <CloseIcon />
        </IconButton>
      </Grid>

      {/* products */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          height: "50%",
        }}
      >
        <Grid sx={{ overflow: "auto", padding: "3%" }}>
          {items}
        </Grid>
      </Grid>

      {/* footer */}
      <Grid sx={{ height: "auto" }}>
        <Grid sx={{ width: "90%", margin: "auto", paddingTop: "0.5rem" }}>
          <Typography
            textAlign="start"
            sx={{ color: "#6b7280", fontWeight: "600", fontSize: "0.7rem" }}
          >
            Apply Discount Code
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={9}>
              <TextField
                fullWidth
                value={discountCodeInput}
                onChange={handleDiscountCodeInput}
                inputProps={{
                  style: {
                    padding: "0.3rem",
                  }
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" onClick={() => setDiscountCode(discountCodeInput)}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: "0.5rem", marginBottom: "0" }} variant="fullWidth" />

        <Box sx={{ width: "90%", margin: "0 auto 1rem" }}>
          <PriceTable prices={prices} />
          <Button variant="contained" fullWidth>
            Continue to checkout
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default Cart;
