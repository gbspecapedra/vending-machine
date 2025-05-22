import { Box, Flex, Heading } from "@chakra-ui/react";
import { useVendingMachine } from "../hooks/useVendingMachine";
import { CartButtons } from "./cart-buttons.component";
import { MessageBox } from "./message-box.component";
import { CartItemList } from "./cart-item-list.component";
import { CartTotal } from "./cart-total.component";

export const CartPanel = () => {
  const {
    balance,
    messages,
    cart,
    getCartTotal,
    incrementItem,
    decrementItem,
  } = useVendingMachine();

  return (
    <Flex direction={"column"} p={4} h={"100%"}>
      <MessageBox messages={messages} />

      <Heading as="h1">Cart</Heading>

      <CartItemList
        cart={cart}
        incrementItem={incrementItem}
        decrementItem={decrementItem}
      />

      <Box borderTop={"1px solid rgba(189, 189, 189, 0.1)"} pt={2}>
        <CartTotal total={getCartTotal()} balance={balance} />
        <CartButtons />
      </Box>
    </Flex>
  );
};
