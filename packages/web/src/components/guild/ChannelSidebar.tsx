import { VStack, Box, Text, HStack, Avatar, Divider, useDisclosure, } from "@chakra-ui/react";
import { Calendar, Grid, Icon, Plus, Trello, Users, Hash, LogOut, Settings, GitHub } from 'react-feather';
import React from "react";
import IconWrapper from '../shared/IconWrapper';
import { useSelectedChannel, Selection } from "../../store/useSelectedChannel";
import CreateChannelModal from "./CreateChannelModal";

export interface Props { };

const ChannelSidebar: React.FC<Props> = (props) => {

    const { select } = useSelectedChannel();
    const disclosure = useDisclosure();

    return (
        <>
            <Box
                d="flex"
                flexDirection="column"
                p="0 0 calc(var(--grid-gap) + 10px) 0"
            >
                <Box
                    bg="var(--background-secondary-alt)"
                    w="250px"
                    h="100%"
                    borderRadius="0 0 10px 10px"
                    marginBottom="var(--grid-gap)"
                >
                    <VStack paddingTop="calc(var(--tidify-logo-height) + 20px)" spacing="5px" p="calc(var(--tidify-logo-height) + 20px) 10px 0 10px">
                        <SectionDivider title="Sections" marginTop="0px" />
                        <Section title="Overview" icon={Grid} onClick={() => select('overview')} />
                        <Section title="Members" icon={Users} onClick={() => select('members')} />
                        <Section title="Calendar" icon={Calendar} onClick={() => select('calendar')} />
                        <Section title="Kanban Board" icon={Trello} onClick={() => select('kanban')} />
                        <Section title="Github Notifications" icon={GitHub} onClick={() => select('github')} />

                        <SectionDivider title="Channels" icon={Plus} onClick={disclosure.onOpen} />

                        <TextChannel name="general" onClick={() => select('text')} />
                        <TextChannel name="talk" onClick={() => select('text')} />
                    </VStack>
                </Box>

                <Box
                    borderRadius="10px"
                    w="auto"
                    h="10%"
                    bg="var(--background-secondary-alt)"
                    p="10px 10px"
                >
                    <HStack>
                        <Avatar src="" />
                        <VStack alignItems="start" spacing="0">
                            <Text fontSize="xl" color="white" fontWeight="bold">Username</Text>
                            <HStack spacing="0">
                                <IconWrapper icon={LogOut} tooltip={{ label: "Logout", placement: "top" }} />
                                <IconWrapper icon={Settings} tooltip={{ label: "Settings", placement: "top" }} />
                            </HStack>
                        </VStack>
                    </HStack>
                </Box>
            </Box>
            <CreateChannelModal disclosure={disclosure} />
        </>
    );
}


type TextChannelProps = {
    name: string;
    onClick: () => void;
}

const TextChannel: React.FC<TextChannelProps> = ({ name, onClick }) => {
    return (
        <Box
            onClick={onClick}
            bg="var(--background-secondary)"
            borderRadius="5px"
            d="flex"
            justifyContent="flex-start"
            alignItems="center"
            p="8px"
            w="100%"
            transition="transform 200ms ease"
            sx={{
                "&:hover": {
                    bg: "white",
                    cursor: 'pointer',
                    transform: "scale(1.025)"
                },
                "&:hover .section": {
                    filter: "invert(62%) sepia(6%) saturate(652%) hue-rotate(227deg) brightness(86%) contrast(91%)"
                },

            }}
        >
            <HStack>
                <Hash color="white" className="section" />
                <Text color="white" fontWeight="bold" className="section">{name}</Text>
            </HStack>
        </Box>
    );
}

type SectionProps = {
    icon: Icon;
    title: string;
    onClick: () => void;
}

const Section: React.FC<SectionProps> = ({ icon: Icon, title, onClick }) => {
    return (
        <Box
            onClick={onClick}
            bg="var(--background-secondary)"
            borderRadius="5px"
            d="flex"
            justifyContent="flex-start"
            alignItems="center"
            p="8px"
            w="100%"
            transition="all 200ms ease"
            sx={{
                "&:hover": {
                    bg: "white",
                    cursor: 'pointer',
                    transform: "scale(1.02)"
                },
                "&:hover .section": {
                    filter: "invert(62%) sepia(6%) saturate(652%) hue-rotate(227deg) brightness(86%) contrast(91%)"
                },

            }}
        >
            <HStack>
                <Icon color="white" className="section" />
                <Text color="white" fontWeight="bold" className="section">{title}</Text>
            </HStack>
        </Box>

    );
}

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

export default ChannelSidebar;