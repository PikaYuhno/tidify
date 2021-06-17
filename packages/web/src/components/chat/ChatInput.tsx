import React from 'react';
import { Input, InputProps } from "@chakra-ui/input"
import { Box, Flex } from "@chakra-ui/layout"
import { Smile } from "react-feather"
import { createEditor, BaseEditor, Descendant } from "slate"
import { Slate, withReact, ReactEditor, Editable } from "slate-react"
import { useMutation, useQueryClient } from 'react-query';
import { Response } from '../../types';
import { ChannelAttributes, MessageAttributes } from '@tidify/common';
import { createMessage } from '../../api/message';
import { useMe } from '../../hooks/useMe';
import { SelectedContext } from 'slate-react/dist/hooks/use-selected';
import { useSelectedChannel } from '../../store/useSelectedChannel';
import { useSocket } from '../../store/useSocket';
import { useSelectedGuild } from '../../store/useSelectedGuild';
import { DateTime } from 'luxon';

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

export interface Props { };

const ChatInput: React.FC<Props> = () => {
    const editor = React.useMemo(() => withReact(createEditor()), []);
    //const [value, setValue] = React.useState<Descendant[]>([]);
    const [value, setValue] = React.useState("");

    const { data: me, isLoading } = useMe();
    const selectedChannel = useSelectedChannel(state => state.selectedChannel) as ChannelAttributes;
    const selectedGuild = useSelectedGuild(state => state.selectedGuild);

    const queryClient = useQueryClient();
    const socket = useSocket(state => state.socket);

    const mutation = useMutation(createMessage, /*{
        onMutate: async (data: { channelId: number, content: string }) => {
            await queryClient.cancelQueries("messagse");

            const snapshot = queryClient.getQueryData<Response<MessageAttributes[]>>("messagse");

            snapshot && queryClient.setQueryData<Response<MessageAttributes[]>>("messages", prev => ({
                data: [
                    ...snapshot.data,
                    {
                        id: Math.random(),
                        content: data.content,
                        channelId: data.channelId,
                        authorId: me.data.userId,
                        guildId: 4,
                        createdAt: new Date().toString(),
                        updatedAt: new Date().toString(),

                    } as MessageAttributes,
                ],
                message: prev!.message,
                success: prev!.success
            }));

            return { snapshot };
        },
        onError: (_, __, context) => {
            if (context?.snapshot) {
                queryClient.setQueryData<Response<MessageAttributes[]>>('messages', context.snapshot);
            }
        },
        onSettled: () => queryClient.invalidateQueries("messages"),
    }*/);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <>
            <Flex
                flex="1"
                alignItems="center"
                w="100%"
            >
                <Box w="100%">
                    <Box
                        bg="var(--background-secondary)"
                        borderRadius="10px"
                        d="flex"
                        alignItems="center"
                        w="100%"
                        p="0px 10px"
                        sx={{
                            "& > div[role=textbox]": {
                                width: '100%'
                            }
                        }}
                    >
                        {/*<Slate
                            editor={editor}
                            value={value}
                            onChange={value => setValue(value)}
                        >
                            <Editable />
                        </Slate>*/}
                        <FormInput
                            value={value}
                            onChange={handleChange}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "Enter" && value !== "") {
                                    mutation.mutate({ content: value, channelId: selectedChannel.id })
                                    socket?.emit("message", {
                                        content: value,
                                        channelId: selectedChannel.id,
                                        authorId: me.data.userId,
                                        id: Math.random(),
                                        guildId: selectedGuild!.id,
                                        createdAt: new Date(DateTime.now().toISO()),
                                        user: {
                                            username: me.data.username
                                        }
                                    } as MessageAttributes);
                                    setValue("");
                                }
                            }}
                            placeholder="Enter a Text"
                        />
                        <Flex>
                            <Smile color="white" />
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </>
    );
}

const FormInput: React.FC<InputProps> = (props) => {
    return (
        <Input {...props} outline="none" boxShadow="none" border="none" bg="transparent" color="var(--text-primary)" focusBorderColor="transparent" 
        sx={{
            "&::-webkit-input-placeholder": {
                color: 'white'
            }
        }}
        />
    )
}

export default ChatInput;