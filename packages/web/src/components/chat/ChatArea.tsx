import React from "react";
import { Box, Flex, VStack } from "@chakra-ui/layout";
import { ChannelAttributes, MessageAttributes } from "@tidify/common";
import { useQuery, useQueryClient } from "react-query";
import { getMessages } from "../../api/message";
import { useSelectedChannel } from "../../store/useSelectedChannel";
import ChatInput from "./ChatInput";
import MessageBox from "./MessageBox";
import { DateTime } from "luxon";
import { scrollbarStyles } from "../../utils/scrollbarStyles";
import { useSocket } from "../../store/useSocket";
import { Response } from "../../types";

interface Props { }

const ChatArea: React.FC<Props> = () => {
    const selectedChannel = useSelectedChannel(
        (state) => state.selectedChannel
    ) as ChannelAttributes;
    const { data, isLoading } = useQuery(["messages", selectedChannel.id], () =>
        getMessages(selectedChannel.id)
    );
    const socket = useSocket((state) => state.socket);
    const queryClient = useQueryClient();

    React.useEffect(() => {
        socket?.off("message");
        const messageListenerId = socket?.on(
            "message",
            (data: MessageAttributes) => {
                queryClient.setQueryData<Response<MessageAttributes[]>>(
                    ["messages", data.channelId],
                    (prev) => {
                        return {
                            data: [...prev!.data, data],
                            success: prev!.success,
                            message: prev!.message,
                        };
                    }
                );
            }
        );
        return () => {
            messageListenerId && socket?.off(messageListenerId.id);
        };
    }, []);
    React.useEffect(() => {
        socket?.off("messages");
    }, [selectedChannel]);

    if (isLoading) return null;

    return (
        <Box
            flex="20"
            bg="var(--background-secondary-alt)"
            borderRadius="10px"
            margin="10px"
            overflow="hidden"
        >
            <Flex flexDirection="column" p="0 15px" h="100%">
                <VStack
                    spacing="0"
                    flex="10"
                    overflow="auto"
                    sx={{
                        ...scrollbarStyles,
                    }}
                >
                    {data.data.map((m: MessageAttributes) => (
                        <MessageBox
                            key={m.id}
                            username={m.user!.username}
                            createdAt={DateTime.fromISO(m.createdAt!.toString()).toISODate()}
                            content={m.content}
                        />
                    ))}
                </VStack>

                <ChatInput />
            </Flex>
        </Box>
    );
};

export default ChatArea;
