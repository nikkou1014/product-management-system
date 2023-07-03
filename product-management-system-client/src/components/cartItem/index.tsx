import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddButton from "../addButton";

import { UserCartItem, CurrentCartItem } from "../../constants/interface";

const CartItem = (props: any) => {
  const { item, currentCart, setCurrentCart, setProductId, setIsProductDetailVisible } = props;

  const handleRemove = (currentCart: UserCartItem[], setCurrentCart: Function, productId: string) => {
    const newCart = [...currentCart];
    const productIndex = newCart.findIndex((item: UserCartItem) => item.uuid === productId);
    newCart.splice(productIndex, 1);
    setCurrentCart(newCart);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ marginTop: 0, marginBottom: "0.3rem" }}
    >
      <Grid item xs={3} sx={{ textAlign: "center", margin: "auto" }}>
        <img
          src={item.imageLink}
          alt={item.name}
          loading="lazy"
          onClick={() => {
            setProductId(item.uuid);
            setIsProductDetailVisible(true);
          }}
          style={{ maxHeight: "4rem", maxWidth: "5rem" }}
        />
      </Grid>
      <Grid item xs={9}>
        <Grid container direction="column" justifyContent="center" spacing={3}>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item xs={9} textAlign="start">
                <Typography
                  sx={{
                    color: "#111827",
                    fontWeight: "700",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.name}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="end">
                <Typography
                  sx={{
                    color: "#1976d2",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  ${item.price}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={6} textAlign="start"
                sx={{ display: (!item.existence || item.inStockQuantity === 0) ? "" : "none" }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    padding: "3px",
                    backgroundColor: "rgba(234, 61, 47, 0.13)",
                    borderRadius: "4px",
                    color: "#EA3D2F",
                    fontSize: "0.7rem",
                  }}
                >
                  {item.existence ? "Out of Stock" : "Unavailable"}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="start"
                sx={{ display: (item.existence && item.inStockQuantity !== 0) ? "" : "none" }}
              >
                <AddButton productId={item.uuid} currentCart={currentCart} setCurrentCart={setCurrentCart} />
              </Grid>
              <Grid item xs={3} textAlign="end">
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => handleRemove(currentCart, setCurrentCart, item.uuid)}
                  sx={{
                    color: "#6b7280",
                    fontWeight: "500",
                    fontSize: "0.7rem",
                    textDecorationColor: "#6b7280",
                  }}
                >
                  {"Remove"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
