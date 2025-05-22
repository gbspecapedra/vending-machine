import { useState } from "react";
import { type Coin } from "../types/coin.type";
import { type Product } from "../types/product.type";
import { VendingMachineContext } from "../types/vending-machine.type";
import type { CartItem } from "../types/cart.type";
import { formatCurrency } from "../utils/currency";

export const VendingMachineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [balance, setBalance] = useState(0);

  const initialMessage =
    "Welcome! Grab a drink in 3 steps: select, add coins, and hit Buy.";
  const [messages, setMessages] = useState<string[]>([initialMessage]);

  const initializeProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const addToCart = (newProduct: Product) => {
    const itemInCart = cart.find((i) => i.id === newProduct.id);

    if (!itemInCart) {
      setCart((prev) => [
        ...prev,
        {
          id: newProduct.id,
          name: newProduct.name,
          price: newProduct.price,
          quantity: 1,
          image: newProduct.image,
        },
      ]);

      setMessages([`${newProduct.name} added to cart.`]);
      return;
    }

    if (itemInCart && itemInCart?.quantity < newProduct.stock) {
      setCart((prev) =>
        prev.map((i) =>
          i.id === newProduct.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
      return;
    } else {
      setMessages([`No more stock for ${newProduct.name}.`]);
    }
  };

  const purchase = () => {
    const total = getCartTotal();

    if (balance < total) {
      setMessages([
        `Insufficient funds. You need ${formatCurrency(total - balance)} more.`,
      ]);
      return;
    }

    const updatedProducts = products.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem) {
        return {
          ...product,
          stock: Math.max(0, product.stock - cartItem.quantity),
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setCart([]);
    setBalance(0);
    setMessages([
      `Purchase complete! Dispensing item… Your change is ${formatCurrency(
        balance - total
      )}.`,
    ]);

    setTimeout(() => {
      setMessages([initialMessage]);
    }, 5000);
  };

  const cancelPurchase = () => {
    if (cart.length === 0 && balance <= 0) return;

    const refunded = balance;

    setBalance(0);
    setCart([]);
    setMessages([`Purchase canceled. Refunded ${formatCurrency(refunded)}.`]);

    setTimeout(() => {
      setMessages([initialMessage]);
    }, 1000);
  };

  const depositCoin = (coin: Coin) => {
    setBalance((prev) => prev + coin);
  };

  const getCartTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getCartQuantity = (id: string): number => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const incrementItem = (id: string) => {
    const item = cart.find((i) => i.id === id);
    const product = products.find((p) => p.id === id);
    if (!item || !product) return;

    if (item.quantity < product.stock) {
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
      );
    } else {
      setMessages([`No more stock for ${product.name}.`]);
    }
  };

  const decrementItem = (id: string) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    if (item.quantity <= 1) {
      setCart((prev) => prev.filter((i) => i.id !== id));
      setMessages([`${item.name} removed from cart.`]);
    } else {
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
      );
      setMessages([`${item.name} quantity decreased.`]);
    }
  };

  return (
    <VendingMachineContext.Provider
      value={{
        balance,
        products,
        cart,
        messages,
        initializeProducts,
        purchase,
        depositCoin,
        addToCart,
        cancelPurchase,
        getCartTotal,
        getCartQuantity,
        incrementItem,
        decrementItem,
      }}
    >
      {children}
    </VendingMachineContext.Provider>
  );
};
