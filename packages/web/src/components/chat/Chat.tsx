import { Flex,} from "@chakra-ui/layout";
import { ChannelAttributes } from "@tidify/common";
import { useSelectedChannel } from "../../store/useSelectedChannel";
import ChatArea from "./ChatArea";
import Members from "./Members";
import Title from "./Title";

export interface Props { };

const Chat: React.FC<Props> = () => {
    const selectedChannel = useSelectedChannel(state => state.selectedChannel) as ChannelAttributes;
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
                <Title name={selectedChannel.name} />
                <ChatArea />
            </Flex>
            <Members />
        </Flex>
    );
}

export default Chat;