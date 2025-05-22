import { createContext } from "react";
import type { Coin } from "./coin.type";
import type { Product } from "./product.type";
import type { CartItem } from "./cart.type";

type VendingMachineContextProps = {
  balance: number;
  cart: CartItem[];
  products: Product[];
  messages: string[];
  initializeProducts: (products: Product[]) => void;
  depositCoin: (coin: Coin) => void;
  addToCart: (product: Product) => void;
  cancelPurchase: () => void;
  purchase: () => void;
  getCartTotal: () => number;
  getCartQuantity: (id: string) => number;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
};

export const VendingMachineContext =
  createContext<VendingMachineContextProps | null>(null);
