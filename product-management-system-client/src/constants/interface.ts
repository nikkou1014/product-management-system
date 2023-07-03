export interface UserCartItem {
  uuid: string;
  quantity: number;
  existence: boolean;
}

export interface CurrentCartItem {
  uuid: string;
  name: string;
  description: string;
  category: string;
  price: number;
  inStockQuantity: number;
  imageLink: string;
  lastModTime: number;
  existence: boolean;
  quantity: number;
}

export interface Prices {
  count: number;
  subtotal: number;
  tax: number;
  discount: number;
  estimatedTotal: number;
}

export interface ProductItem {
  uuid: string;
  name: string;
  description: string;
  category: string;
  price: number;
  inStockQuantity: number;
  imageLink: string;
  lastModTime: number;
  existence: boolean;
}
