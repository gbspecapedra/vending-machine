import {
  Badge,
  Box,
  HStack,
  IconButton,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import { HiMiniChevronUp, HiMiniChevronDown } from "react-icons/hi2";
import type { CartItem } from "../types/cart.type";

export const CartItemList = ({
  cart,
  incrementItem,
  decrementItem,
}: {
  cart: CartItem[];
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
}) => {
  return (
    <Box
      alignContent={"stretch"}
      flexGrow={1}
      overflowY="auto"
      scrollBehavior={"smooth"}
    >
      {cart.length === 0 ? (
        <Text color="gray.400">No product selected</Text>
      ) : (
        <VStack align={"stretch"}>
          {cart.map((item) => (
            <HStack align={"center"} justifyContent={"start"} w="100%" mt={4}>
              <VStack gap={0.5}>
                <IconButton
                  variant={"ghost"}
                  aria-label="Increase"
                  size="xs"
                  colorPalette={"gray"}
                  onClick={() => incrementItem(item.id)}
                >
                  <HiMiniChevronUp />
                </IconButton>
                <Badge size={"sm"} variant={"surface"} colorPalette={"gray"}>
                  {item.quantity}
                </Badge>
                <IconButton
                  variant={"ghost"}
                  colorPalette={"gray"}
                  aria-label="Decrease"
                  size="xs"
                  onClick={() => decrementItem(item.id)}
                >
                  <HiMiniChevronDown />
                </IconButton>
              </VStack>

              <Image
                src={item.image}
                alt={item.name}
                boxSize="75px"
                objectFit="contain"
                borderRadius={"md"}
                mb={2}
              />
              <HStack
                align={"center"}
                justifyContent={"space-between"}
                w="100%"
              >
                <Text fontWeight="semibold" textTransform={"uppercase"}>
                  {item.name}
                </Text>
                <Text fontSize="sm">
                  {((item.price * item.quantity) / 100).toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )}
                </Text>
              </HStack>
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
};
