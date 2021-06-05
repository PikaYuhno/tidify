import { Box, Flex, VStack } from "@chakra-ui/layout";
import ChatInput from "./ChatInput";
import MessageBox from "./MessageBox";

export interface Props { };

const ChatArea: React.FC<Props> = (props) => {
    return (
        <Box
            flex="20"
            bg="var(--background-secondary-alt)"
            borderRadius="10px"
            margin="10px"
        >
            <Flex
                flexDirection="column"
                p="0 15px"
                h="100%"
            >
                <VStack spacing="0" flex="10">
                    <MessageBox username="Max Mustermann" createdAt="20.12.2021" content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr." />
                    <MessageBox username="Max Mustermann" createdAt="20.12.2021" content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum." />
                    <MessageBox username="Max Mustermann" createdAt="20.12.2021" content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." />
                </VStack>


                <ChatInput />
            </Flex>
        </Box>
    );
}

export default ChatArea;