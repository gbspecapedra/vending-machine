import { ColorModeButton } from "@/components/ui/color-mode";
import { CartPanel } from "@/features/vending/components/cart-panel.component";
import { ProductList } from "@/features/vending/components/product-list.component";
import { VendingMachineProvider } from "@/features/vending/context/vending-machine.context";
import { Container, Flex, Heading, HStack, Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <VendingMachineProvider>
      <Container w={"dvw"} h={"dvh"} justifyContent={"space-between"}>
        <HStack
          p={2}
          justifyContent={"space-between"}
          borderBottom={"1px solid"}
          borderColor="gray.200"
        >
          <Heading as="h1">
            Your Mood Booster Is Waiting — Pick Your Favorite Beverage!
          </Heading>
          <ColorModeButton />
        </HStack>

        <Flex justifyContent={"space-between"} h={"90%"}>
          <Stack overflowY={"auto"} scrollBehavior={"smooth"}>
            <ProductList />
          </Stack>
          <Stack
            border="1px solid rgba(255, 255, 255, 0.3)"
            borderRadius="lg"
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
            backdropFilter="blur(10px)"
            w={"30%"}
            mt={4}
          >
            <CartPanel />
          </Stack>
        </Flex>
      </Container>
    </VendingMachineProvider>
  );
}
