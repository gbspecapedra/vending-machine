import type { CoinInventory } from "../types/coin.type";
import cola from "@/assets/cola.png";
import dietcola from "@/assets/dietcola.png";
import limesoda from "@/assets/sprite.png";
import water from "@/assets/water.png";
import type { DrinkProduct } from "../types/product.type";

export const initialCoins: CoinInventory = {
  5: 5,
  10: 5,
  25: 5,
};

export const initialProducts: DrinkProduct[] = [
  { id: "COLA", image: cola, name: "COLA", price: 25, stock: 10 },
  {
    id: "DIETCOLA",
    image: dietcola,
    name: "DIETCOLA",
    price: 35,
    stock: 8,
  },
  {
    id: "LIMESODA",
    image: limesoda,
    name: "LIMESODA",
    price: 25,
    stock: 0,
  },
  { id: "WATER", image: water, name: "WATER", price: 45, stock: 2 },
];
