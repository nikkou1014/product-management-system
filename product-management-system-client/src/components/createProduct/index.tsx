import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";

import ImageIcon from "@mui/icons-material/Image";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import api from "../../api/productApi";
import { isNumber } from "util";

const CreateProduct = (props: any) => {
  const { setIsCreatingProduct, isEditingProduct, setIsEditingProduct, productId } = props;

  const [alert, setAlert] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [inStockQuantity, setInStockQuantity] = useState("");
  const [imageLink, setImageLink] = useState("");

  const handleProductName = (event: any) => {
    setProductName(event.target.value);
  };
  const handleProductDescription = (event: any) => {
    setProductDescription(event.target.value);
  };
  const handleCategory = (event: any) => {
    setCategory(event.target.value);
  };
  const handlePrice = (event: any) => {
    setPrice(event.target.value);
  };
  const handleInStockQuantity = (event: any) => {
    setInStockQuantity(event.target.value);
  };
  const handleImageLink = (event: any) => {
    setImageLink(event.target.value);
  };

  const isNumber = (input: String) => {
    return (input !== '' && !isNaN(Number(input)));
  }

  const validate = () => {
    return (
      productName !== '' &&
      productDescription !== '' &&
      category !== '' &&
      isNumber(price) &&
      isNumber(inStockQuantity) &&
      imageLink !== ''
    );
  };

  const submit = async () => {
    try {
      if (!validate()) {
        setAlert(true);
      } else {
        const date = Date.now();
        const response = await api.createProductApi({
          name: productName,
          description: productDescription,
          category: category,
          price: parseFloat(price),
          inStockQuantity: parseInt(inStockQuantity, 10),
          imageLink: "https://" + imageLink,
          lastModTime: date,
        });
        setAlert(false);
        setIsCreatingProduct(false);
        setIsEditingProduct(false);
        return response;
      }
    } catch (e) {
      console.log(e);
      (window as any).setError();
      // throw new Error("Create Product API error");
    }
  };

  const update = async () => {
    try {
      if (!validate()) {
        setAlert(true);
      } else {
        const date = Date.now();
        const response = await api.modProductApi({
          uuid: productId,
          name: productName,
          description: productDescription,
          category: category,
          price: parseFloat(price),
          inStockQuantity: parseInt(inStockQuantity, 10),
          imageLink: "https://" + imageLink,
          lastModTime: date,
        });
        setAlert(false);
        setIsCreatingProduct(false);
        setIsEditingProduct(false);
        return response;
      }
    } catch (e) {
      console.log(e);
      (window as any).setError();
      // throw new Error("Modify Product API error");
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await api.delProductApi(productId);
      setIsCreatingProduct(false);
      setIsEditingProduct(false);
      return response;
    } catch (e) {
      console.log(e);
      (window as any).setError();
      // throw new Error("Delete Product API error");
    }
  };

  useEffect(() => {
    api
      .getProductApi(productId)
      .then((response) => {
        if (response) {
          if (isEditingProduct) {
            setProductName(response.name);
            setProductDescription(response.description);
            setCategory(response.category);
            setPrice(`${response.price}`);
            setInStockQuantity(`${response.inStockQuantity}`);
            setImageLink(response.imageLink.substring(8, response.imageLink.length));
            setImageVisible(true);
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [isEditingProduct, productId]);

  const editingButtons = (
    <Grid container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={6}>
        <Button variant="contained" onClick={update}>
          Update Product
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="error" onClick={deleteProduct}>
          Delete Product
        </Button>
      </Grid>
    </Grid>
  );

  const imageContent = (
    imageVisible
      ? (<img
        src={"https://" + imageLink}
        alt={productName}
        loading="lazy"
        style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
      />)
      : (<Box>
        <ImageIcon
          sx={{
            marginTop: "40px",
            fontSize: "35px",
            color: "#E5E5E5",
          }}
        />
        <Typography sx={{ color: "#6B7280" }}>image preview!</Typography>
      </Box>)
  );

  return (
    <Container fixed sx={{ width: "500px" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: "0.5rem 0" }}
      >
        <Typography variant="h5" textAlign="start">
          Create Product
        </Typography>
        <IconButton
          onClick={() => {
            setIsCreatingProduct(false);
            setIsEditingProduct(false);
          }}
          sx={{ p: "0.8rem", padding: 0 }}
        >
          <ArrowBackIcon sx={{ marginRight: "0.3rem" }} />
          <Typography variant="h5" textAlign="end">Back</Typography>
        </IconButton>
      </Grid>
      <Box
        textAlign="start"
        sx={{
          borderRadius: "4px",
          backgroundColor: "#ffffff",
          padding: "25px",
        }}
      >
        <Alert severity="error" sx={{ padding: "2px 10px", display: alert ? "" : "none" }}>
          Please check the inputs!
        </Alert>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography>Product name</Typography>
          <TextField
            required
            fullWidth
            error={productName === ""}
            helperText={(productName === "") ? "Product name can't be empty" : ""}
            value={productName}
            onChange={handleProductName}
          />
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography>Product Description</Typography>
          <TextField
            required
            id="outlined-multiline-static"
            fullWidth
            multiline
            rows={5}
            error={productDescription === ""}
            helperText={(productDescription === "") ? "Product description can't be empty" : ""}
            value={productDescription}
            onChange={handleProductDescription}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={6}>
            <Typography>Category</Typography>
            <FormControl fullWidth>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={category === ""}
                value={category}
                onChange={handleCategory}
              >
                <MenuItem value={"Category1"}>Category1</MenuItem>
                <MenuItem value={"Category2"}>Category2</MenuItem>
                <MenuItem value={"Category3"}>Category3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Typography>Price</Typography>
            <TextField
              required
              fullWidth
              error={!isNumber(price)}
              helperText={!isNumber(price) ? "Please enter a number" : ""}
              value={price}
              onChange={handlePrice}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={4}>
            <Typography>In Stock Quantity</Typography>
            <TextField
              required
              fullWidth
              error={!isNumber(inStockQuantity)}
              helperText={!isNumber(inStockQuantity) ? "Please enter a number" : ""}
              value={inStockQuantity}
              onChange={handleInStockQuantity}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography>Add Image Link</Typography>
            <FormControl variant="outlined">
              <OutlinedInput
                required
                startAdornment={<Typography>https://</Typography>}
                endAdornment={
                  <InputAdornment position="end">
                    <Button variant="contained" onClick={() => setImageVisible(true)}>
                      Upload
                    </Button>
                  </InputAdornment>
                }
                error={imageLink === ""}
                value={imageLink}
                onChange={handleImageLink}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box
          textAlign="center"
          sx={{
            margin: "20px auto",
            height: "150px",
            width: "300px",
            border: "1px dashed #cccccc",
            borderRadius: "4px",
            backgroundColor: "#ffffff",
          }}
        >
          {imageContent}
        </Box>
        <Box>
          {
            isEditingProduct
              ? editingButtons
              : <Button variant="contained" onClick={submit}>
                Add Product
              </Button>
          }
        </Box>
      </Box>
    </Container>
  );
};

export default CreateProduct;
