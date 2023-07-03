import { UserCartItem, CurrentCartItem } from "../constants/interface";

const LOCAL_PRODUCT_API_BASE_URL = "http://localhost:3002/products";
const { v4: uuidv4 } = require("uuid");

const getAllProductsApi = async () => {
  try {
    const response = await fetch(LOCAL_PRODUCT_API_BASE_URL, {
      method: "GET",
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};

const getProductsTotalNumber = async () => {
  try {
    const response = await fetch("http://localhost:3002/productstotalnumber", {
      method: "GET",
    });
    const result = await response.json();
    return parseInt(result);
  } catch (e) {
    console.log(e);
  }
};

const getProductApi = async (productId: string) => {
  try {
    const response = await fetch(
      `${LOCAL_PRODUCT_API_BASE_URL}/${encodeURI(productId)}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};

const getProductsListApi = async (products: UserCartItem[]) => {
  try {
    let result: CurrentCartItem[] = [];
    for (let i = 0; i < products.length; i++) {
      const response = await getProductApi(products[i].uuid);
      const item = { ...response };
      item.quantity = products[i].quantity;
      result.push(item);
    }
    return result;
  } catch (e) {
    console.log(e);
  }
};
const getProductsByPageApi = async (req: any) => {
  try {
    const response = await fetch(`${LOCAL_PRODUCT_API_BASE_URL}/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};

const createProductApi = async (product: any) => {
  try {
    product.uuid = uuidv4();
    product.existence = true;
    await fetch(LOCAL_PRODUCT_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    return product;
  } catch (e) {
    console.log(e);
  }
};

const modProductApi = async (product: any) => {
  try {
    await fetch(`${LOCAL_PRODUCT_API_BASE_URL}/${encodeURI(product.uuid)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    // const result = await response.json();
    // return result;
  } catch (e) {
    console.log(e);
  }
};

const delProductApi = async (productId: string) => {
  try {
    const response = await getProductApi(productId);
    const newProduct = { ...response };
    newProduct.existence = false;

    await fetch(`${LOCAL_PRODUCT_API_BASE_URL}/${encodeURI(productId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  } catch (e) {
    console.log(e);
  }
  // try {
  //   const response = await fetch(
  //     `${LOCAL_PRODUCT_API_BASE_URL}/${encodeURI(productId)}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const result = await response.json();
  //   return result;
  // } catch (e) {
  //   console.log(e);
  // }
};

export default {
  getAllProductsApi,
  getProductsTotalNumber,
  getProductApi,
  getProductsListApi,
  getProductsByPageApi,
  createProductApi,
  modProductApi,
  delProductApi,
};
