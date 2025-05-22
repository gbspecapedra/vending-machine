import { Button, HStack, Stack } from "@chakra-ui/react";
import { useVendingMachine } from "../hooks/useVendingMachine";
import { Tooltip } from "@/components/ui/tooltip";

export const CartButtons = () => {
  const { depositCoin, cancelPurchase, purchase, getCartTotal, balance, cart } =
    useVendingMachine();
  const cartTotal = getCartTotal();
  const isDisabled = balance < cartTotal || cart.length === 0;

  const buyButton = () => (
    <Button
      flex="1"
      colorPalette="green"
      disabled={isDisabled}
      onClick={purchase}
    >
      Buy
    </Button>
  );

  return (
    <Stack my={2}>
      <HStack gap={1} w={"100%"}>
        <Button flex="1" onClick={() => depositCoin(5)}>
          5¢
        </Button>
        <Button flex="1" onClick={() => depositCoin(10)}>
          10¢
        </Button>
        <Button flex="1" onClick={() => depositCoin(25)}>
          25¢
        </Button>
      </HStack>
      <HStack w={"100%"}>
        <Button flex="1" colorPalette="red" onClick={cancelPurchase}>
          Cancel
        </Button>
        {!isDisabled ? (
          buyButton()
        ) : (
          <Tooltip
            content={`${
              balance < cartTotal
                ? "Insufficient funds. Please insert more coins or cancel for a refund"
                : "No product selected."
            }`}
            showArrow
            openDelay={0}
            positioning={{ placement: "top" }}
          >
            {buyButton()}
          </Tooltip>
        )}
      </HStack>
    </Stack>
  );
};
