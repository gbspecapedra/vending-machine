import { useState } from "react";
import { type Coin, type CoinInventory } from "../types/coin.type";
import { type Product } from "../types/product.type";
import { VendingMachineContext } from "../types/vending-machine.type";
import type { CartItem } from "../types/cart.type";
import { formatCurrency } from "../utils/currency";
import { initialCoins } from "../data";

export const VendingMachineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [balance, setBalance] = useState(0);
  const [coins, setCoins] = useState<CoinInventory>(initialCoins);

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

    const changeAmount = balance - total;

    const change = giveChange(changeAmount);
    if (change === null) {
      setMessages([`Unable to give change. Please insert exact amount.`]);
      return;
    }

    const updatedProducts = products.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      if (!cartItem) return product;

      return {
        ...product,
        stock: Math.max(0, product.stock - cartItem.quantity),
      };
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
    }, 3000);
  };

  const depositCoin = (coin: Coin) => {
    setBalance((prev) => prev + coin);

    setCoins((prev) => ({
      ...prev,
      [coin]: prev[coin] + 1,
    }));
  };

  const giveChange = (change: number): CoinInventory | null => {
    const changeGiven: CoinInventory = { 5: 0, 10: 0, 25: 0 };
    let remaining = change;

    const coinValues: Coin[] = [25, 10, 5];

    const availableCoins = { ...coins };

    for (const value of coinValues) {
      while (remaining >= value && availableCoins[value] > 0) {
        remaining -= value;
        availableCoins[value]--;
        changeGiven[value]++;
      }
    }

    if (remaining === 0) {
      setCoins(availableCoins);
      return changeGiven;
    } else {
      return null;
    }
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
        coins,
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
