import { Badge, Box, Card, Flex, Image, Tag, Text } from "@chakra-ui/react";
import type { Product } from "../types/product.type";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";

type ProductCardProps = {
  product: Product;
  quantity: number;
  onClick: (product: Product) => void;
};

export const ProductCard = ({
  product,
  quantity,
  onClick,
}: ProductCardProps) => {
  const isDisabled = product.stock <= 0;
  const bg = useColorModeValue("white", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  const card = (
    <Card.Root
      key={product.id}
      variant={"elevated"}
      maxW="sm"
      onClick={!isDisabled ? () => onClick(product) : undefined}
      bg={bg}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      opacity={isDisabled ? 0.6 : 1}
      _hover={
        !isDisabled
          ? { bg: hoverBg, boxShadow: "md", transform: "scale(1.02)" }
          : {}
      }
      transition="all 0.2s ease"
      _focus={{
        boxShadow: "outline",
      }}
      tabIndex={isDisabled ? -1 : 0}
      h="auto"
    >
      <Card.Body alignItems={"center"} gap={2}>
        <Flex justifyContent={"space-between"} alignItems={"flex-end"} w="100%">
          <Box>
            {quantity > 0 && (
              <Badge variant={"surface"} colorPalette={"gray"}>
                x{quantity}
              </Badge>
            )}
          </Box>
          <Tag.Root
            variant={"surface"}
            size={"md"}
            colorPalette={"green"}
            alignSelf={"self-end"}
          >
            <Tag.Label>
              {(product.price / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Tag.Label>
          </Tag.Root>
        </Flex>

        <Image
          src={product.image}
          alt={product.name}
          boxSize="150px"
          objectFit="contain"
          mb={2}
        />
        <Text
          textStyle="sm"
          fontWeight="medium"
          letterSpacing="tight"
          alignSelf={"center"}
          textTransform={"uppercase"}
          truncate
          maxW="100%"
        >
          {product.name}
        </Text>

        {product.stock <= 0 && (
          <Text as="small" fontSize="2xs" color="red.500" alignSelf={"center"}>
            OUT OF STOCK
          </Text>
        )}
      </Card.Body>
    </Card.Root>
  );

  return isDisabled ? (
    <Tooltip content={"Out Of Stock"} showArrow>
      <div>{card}</div>
    </Tooltip>
  ) : (
    card
  );
};
