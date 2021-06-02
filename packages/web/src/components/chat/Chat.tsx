import { Flex,} from "@chakra-ui/layout";
import ChatArea from "./ChatArea";
import Members from "./Members";
import Title from "./Title";

export interface Props { };

const Chat: React.FC<Props> = () => {
    return (
        <Flex
            w="100%"
            h="100%"
        >
            <Flex
                flex="4"
                h="100%"
                w="100%"
                flexDirection="column"
                p="10px"
            >
                <Title name="general" />
                <ChatArea />
            </Flex>
            <Members />
        </Flex>
    );
}

export default Chat;