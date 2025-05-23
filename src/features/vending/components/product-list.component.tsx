import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useVendingMachine } from "../hooks/useVendingMachine";
import { ProductCard } from "./product-card.component";
import { useDrinks } from "../hooks/useDrinks";
import { useEffect } from "react";

export const ProductList = () => {
  const { drinks, loading } = useDrinks();
  const { addToCart, products, initializeProducts, cart } = useVendingMachine();

  useEffect(() => {
    if (products.length === 0 && !loading && drinks.length > 0) {
      initializeProducts(drinks);
    }
  }, [drinks, initializeProducts, loading, products.length]);

  const getQuantity = (id: string) => {
    const item = cart.find((i) => i.id === id);
    return item?.quantity ?? 0;
  };

  if (loading) {
    return (
      <SimpleGrid columns={[2, 1, 3, 4]} gap={4} p={4}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            height="230px"
            width={"210px"}
            borderRadius="md"
            variant={"pulse"}
          />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid columns={[2, 1, 3, 4]} gap={4} p={4} mr={4}>
      {products.map((p, i) => {
        const quantity = getQuantity(p.id);
        return (
          <ProductCard
            key={i}
            product={p}
            quantity={quantity}
            onClick={addToCart}
          />
        );
      })}
    </SimpleGrid>
  );
};
