import { Flex, Text } from "@chakra-ui/react";
import { formatCurrency } from "../utils/currency";

export const CartTotal = ({
  total,
  balance,
}: {
  total: number;
  balance: number;
}) => {
  const change = balance - total > 0 ? balance - total : 0;

  return (
    <>
      <Flex direction={"column"} textTransform={"uppercase"} gap={0} w="100%">
        <Flex justify={"space-between"}>
          <Text fontSize="sm">Total</Text>
          <Text fontWeight="bold">{formatCurrency(total)}</Text>
        </Flex>

        <Flex justify={"space-between"}>
          <Text fontSize="sm">Your Balance</Text>
          <Text fontWeight="bold">{formatCurrency(balance)}</Text>
        </Flex>

        <Flex justify={"space-between"}>
          <Text fontSize="sm">Change</Text>
          <Text fontWeight="bold">{formatCurrency(change)}</Text>
        </Flex>
      </Flex>
    </>
  );
};
