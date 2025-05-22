export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
}

export type DrinkProduct = Product;
