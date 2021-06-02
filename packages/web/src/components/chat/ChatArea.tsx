import { Box, Flex } from "@chakra-ui/layout";

export interface Props { };

const ChatArea: React.FC<Props> = (props) => {
    return (
        <Box
            flex="10"
            bg="var(--background-secondary-alt)"
            borderRadius="15px"
            margin="10px"
        >
            <Flex>
                <Box></Box>
                <Box></Box>
            </Flex>
        </Box>
    );
}

export default ChatArea;