import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AddButton from "../addButton";

import { ProductItem } from "../../constants/interface";

const ProductsList = (props: any) => {
  const {
    userStatus,
    setAlert,
    userType,
    itemData,
    currentCart,
    setCurrentCart,
    setProductId,
    setIsCreatingProduct,
    setIsEditingProduct,
    setIsProductDetailVisible,
  } = props;

  const maxTitleLength = 40;
  const truncate = (name: string, length: number) => {
    if (name.length > length) {
      return name.substring(0, length) + '...';
    } else {
      return name;
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      {itemData.map((item: ProductItem) => {
        if (!item.existence) {
          return null;
        }
        return (
          <Grid key={item.uuid} item xs={12} sm={6} md={3} lg={2}
            sx={{ padding: "0.6rem" }}
          >
            <Grid sx={{ height: "5rem" }}>
              <img
                src={item.imageLink}
                alt={item.name}
                loading="lazy"
                onClick={() => {
                  setProductId(item.uuid);
                  setIsProductDetailVisible(true);
                }}
                style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
              />
            </Grid>
            <Typography textAlign="start" sx={{ height: "2.5rem", padding: "0.25rem 0", color: "#6b7280", fontSize: "0.6rem", fontWeight: "400" }}>
              {truncate(item.name, maxTitleLength)}
            </Typography>
            <Typography textAlign="start" sx={{ color: "#111827", fontSize: "0.8rem", fontWeight: "600" }}>
              ${item.price}
            </Typography>

            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={6} >
                <div>
                  {(item.inStockQuantity === 0)
                    ? <Typography
                      sx={{
                        padding: "3px",
                        margin: "auto",
                        maxWidth: "5rem",
                        backgroundColor: "rgba(234, 61, 47, 0.13)",
                        borderRadius: "4px",
                        color: "#EA3D2F",
                        fontSize: "0.7rem",
                      }}
                    >
                      Out of Stock
                    </Typography>
                    :
                    <AddButton
                      userStatus={userStatus}
                      setAlert={setAlert}
                      productId={item.uuid}
                      currentCart={currentCart}
                      setCurrentCart={setCurrentCart} />
                  }
                </div>
              </Grid>
              <Grid item xs={6} sx={{ display: (userType === "ADMIN") ? "" : "none" }}>
                <Button variant="outlined" sx={{ height: "1.5rem" }}
                  onClick={() => {
                    setProductId(item.uuid);
                    setIsEditingProduct(true);
                    setIsCreatingProduct(true);
                  }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>

          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductsList;