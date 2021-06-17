import { VStack, Box, Text, HStack, Avatar, useDisclosure, Badge, } from "@chakra-ui/react";
import { Calendar, Grid, Icon, Plus, Trello, Users, Hash, LogOut, Settings, GitHub, FileText, Volume } from 'react-feather';
import React from "react";
import IconWrapper from '../shared/IconWrapper';
import { useSelectedChannel } from "../../store/useSelectedChannel";
import CreateChannelModal from "./CreateChannelModal";
import { useMe } from "../../hooks/useMe";
import { useSelectedGuild } from "../../store/useSelectedGuild";
import { scrollbarStyles } from "../../utils/scrollbarStyles";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getChannels } from "../../api/channel";
import { ChannelAttributes } from "@tidify/common";
import { useSocket } from "../../store/useSocket";
import { logout } from "../../api/auth";
import { History } from 'history';
import { RouteComponentProps, withRouter } from "react-router";

interface Props extends RouteComponentProps {
    history: History;
};

const ChannelSidebar: React.FC<Props> = React.memo(({ history }) => {
    const { select, selectedChannel } = useSelectedChannel();
    const selectedGuild = useSelectedGuild(state => state.selectedGuild);

    console.log("ChannelSidbar - Rerendered", selectedGuild, selectedChannel);
    const channelQuery = useQuery(['channels', selectedGuild?.id], () => getChannels(selectedGuild?.id), { enabled: !!selectedGuild });

    const disclosure = useDisclosure();
    const { data, isLoading } = useMe();
    const socket = useSocket(state => state.socket);

    const mutation = useMutation(logout);
    const queryClient = useQueryClient();

    const handleLogout = () => {
        mutation.mutate();
        queryClient.invalidateQueries('me');
        history.push('/')
    }

    return (
        <>
            <Box
                d="flex"
                flexDirection="column"
                p="0 0 var(--grid-gap) 0"
            >
                <Box
                    bg="var(--background-secondary-alt)"
                    w="250px"
                    h="100%"
                    borderRadius="0 0 10px 10px"
                    paddingBottom="var(--grid-gap)"
                    marginBottom="var(--grid-gap)"
                    overflow="auto"
                    sx={{ ...scrollbarStyles }}
                >
                    <VStack
                        paddingTop="calc(var(--tidify-logo-height) + 20px)"
                        spacing="5px"
                        p="calc(var(--tidify-logo-height) + 20px) 10px 0 10px"
                    >
                        {selectedGuild &&
                            <>
                                <Box
                                    w="100%"
                                    p="5px"
                                    border="2px solid var(--background-secondary)"
                                    borderRadius="5px"
                                >
                                    <Text fontWeight="bold" fontSize="2xl" color="white" textAlign="center">{selectedGuild!.name}</Text>
                                </Box>
                                <SectionDivider title="Sections" marginTop="0px" />
                                <Section title="Overview" icon={Grid} onClick={() => select('overview')} isSelected={selectedChannel === 'overview'} />
                                <Section title="Members" icon={Users} onClick={() => select('members')} isSelected={selectedChannel === 'members'} />
                                <Section title="Calendar" icon={Calendar} onClick={() => select('calendar')} isSelected={selectedChannel === 'calendar'} />
                                <Section title="Kanban Board" icon={Trello} onClick={() => select('kanban')} isSelected={selectedChannel === 'kanban'} />
                                <Section title="GH Notifications" icon={GitHub} /*onClick={() => select('github')} isSelected={selectedChannel === 'github'}*/ onClick={() => { }} isSelected={false} disabled />
                                <Section title="Documents" icon={FileText} /*onClick={() => select('github')} isSelected={selectedChannel === 'github'}*/ onClick={() => { }} isSelected={false} disabled />
                                <Section title="Announcements" icon={Volume} /*onClick={() => select('github')} isSelected={selectedChannel === 'github'}*/ onClick={() => { }} isSelected={false} disabled />

                                <SectionDivider title="Channels" icon={Plus} onClick={disclosure.onOpen} />

                                {!channelQuery!.isLoading && channelQuery!.data.data && channelQuery!.data.data.channels!.map((channel: ChannelAttributes, i: number) => (
                                    <TextChannel key={i} isSelected={typeof selectedChannel !== 'string' && (selectedChannel as ChannelAttributes).id === channel.id} channel={channel} onClick={() => {
                                        select(channel);
                                        socket?.emit("join-channel", { channelId: channel.id });
                                    }} />
                                ))}

                            </>
                        }
                    </VStack>
                </Box>

                <Box
                    borderRadius="10px"
                    w="auto"
                    h="auto"
                    bg="var(--background-secondary-alt)"
                    p="3px 10px"
                >
                    <HStack>
                        <Avatar src="" size="sm" />
                        <VStack alignItems="start" spacing="0">
                            <Text fontSize="md" color="white" fontWeight="bold">{!isLoading && data.data.username}</Text>
                            <HStack spacing="0">
                                <IconWrapper icon={LogOut} tooltip={{ label: "Logout", placement: "top" }} h="17px" w="17px" onClick={handleLogout} />
                                <IconWrapper icon={Settings} tooltip={{ label: "Settings", placement: "top" }} h="17px" w="17px" />
                            </HStack>
                        </VStack>
                    </HStack>
                </Box>
            </Box>
            <CreateChannelModal disclosure={disclosure} />
        </>
    );
});


type TextChannelProps = {
    channel: ChannelAttributes;
    isSelected: boolean;
    onClick: () => void;
}

// todo is selected
const TextChannel: React.FC<TextChannelProps> = ({ channel, onClick, isSelected }) => {
    return (
        <Box
            onClick={onClick}
            bg={isSelected ? "white" : "var(--background-secondary)"}
            borderRadius="5px"
            d="flex"
            justifyContent="flex-start"
            alignItems="center"
            p="8px"
            w="100%"
            transition="transform 100ms ease-in-out"
            sx={{
                "&:hover": {
                    bg: "white",
                    cursor: 'pointer',
                    transform: "scale(1.025)"
                },
                "&:hover .section": {
                    filter: "invert(43%) sepia(11%) saturate(481%) hue-rotate(227deg) brightness(94%) contrast(95%);",
                    color: 'var(--background-primary)'
                },

            }}
        >
            <HStack>
                <Hash color={isSelected ? 'var(--background-primary)' : "white"} className="section" />
                <Text color={isSelected ? 'var(--background-primary)' : "white"} fontWeight="bold" className="section">{channel.name}</Text>
            </HStack>
        </Box>
    );
}

type SectionProps = {
    icon: Icon;
    title: string;
    isSelected: boolean;
    disabled?: boolean;
    onClick: () => void;
}

// 2 sec with memo
const Section: React.FC<SectionProps> = React.memo(({ icon: Icon, title, onClick, isSelected, disabled }) => {
    return (
        <Box
            onClick={onClick}
            bg={isSelected ? "white" : "var(--background-secondary)"}
            opacity={disabled ? 0.4 : undefined}
            box-shadow={disabled ? "var(--chakra-shadows-none)" : undefined}
            borderRadius="5px"
            d="flex"
            justifyContent="flex-start"
            alignItems="center"
            p="8px"
            w="100%"
            transition="transform 100ms ease-in-out"
            sx={{
                "&:hover": {
                    bg: "white",
                    cursor: `${disabled ? "not-allowed" : "pointer"}`,
                    transform: "scale(1.02)"
                },
                "&:hover .section": {
                    filter: "invert(43%) sepia(11%) saturate(481%) hue-rotate(227deg) brightness(94%) contrast(95%);",
                    //fill: 'var(--background-primary)',
                    color: 'var(--background-primary)'
                },

            }}
        >
            <HStack>
                <Icon color={isSelected ? 'var(--background-primary)' : "white"} className="section" />
                <Text color={isSelected ? 'var(--background-primary)' : "white"} fontWeight="bold" className="section">{title}</Text>
                {disabled && <Badge colorScheme="purple">Soon</Badge>}
            </HStack>
        </Box>

    );
});

type SectionDividerProps = {
    icon?: Icon;
    title: string;
    marginTop?: string;
    onClick?: () => void;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ icon: Icon, title, marginTop, onClick }) => {
    return (
        <Box
            d="flex"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            marginTop={marginTop || "20px"}
        >
            <Text color="white" fontWeight="bold" fontSize="sm" textTransform="uppercase">{title}</Text>
            {Icon && <IconWrapper icon={Icon} tooltip={{ label: "Create Channel", placement: "top" }} p="0" onClick={onClick} />}
        </Box>
    );
}

export default withRouter<Props, any>(ChannelSidebar);