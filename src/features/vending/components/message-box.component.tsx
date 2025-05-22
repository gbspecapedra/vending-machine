import { Box, VStack, Text } from "@chakra-ui/react";

export const MessageBox = ({ messages }: { messages: string[] }) => {
  return (
    <Box
      bg="rgba(189, 189, 189, 0.1)"
      border="1px solid rgba(255, 255, 255, 0.3)"
      borderRadius="lg"
      p={6}
      h="130px"
      w="100%"
      overflowY={"auto"}
      mb={2}
    >
      <VStack align="start" gap={3}>
        {messages
          .map((msg, i) => (
            <Text key={i} fontSize="md" whiteSpace="pre-wrap">
              {msg}
            </Text>
          ))
          .reverse()}
      </VStack>
    </Box>
  );
};
