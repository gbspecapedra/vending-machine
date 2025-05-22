/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { DrinkProduct } from "../types/product.type";
import { initialProducts } from "../data";

export const useDrinks = () => {
  const [drinks, setDrinks] = useState<DrinkProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrinks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://world.openfoodfacts.org/cgi/search.pl?search_terms=soft+drinks&search_simple=1&action=process&json=1"
        ).then((response) => response.json());

        const mapped = res.products
          .filter((p: any) => p.product_name && p.image_front_url)
          .slice(0, 30)
          .map((p: any) => ({
            id: p.id || p.code,
            name: p.product_name,
            image: p.image_front_url,
            price: Math.floor(Math.random() * 30) + 20, // random price between 20¢ e 50¢
            stock: Math.floor(Math.random() * 10), // random stock between entre 0 e 9
          }));

        setDrinks([...initialProducts, ...mapped]);
      } catch (err) {
        console.error("Failed to fetch drinks:", err);
      } finally {
        setLoading(false);
      }
    };

    if (drinks.length === 0) {
      fetchDrinks();
    }
  }, [drinks.length]);

  return { drinks, loading, setDrinks };
};
