import { VStack, Box, Text, HStack, Avatar, Divider, useDisclosure, } from "@chakra-ui/react";
import { Calendar, Grid, Icon, Plus, Trello, Users, Hash, LogOut, Settings, GitHub } from 'react-feather';
import React from "react";
import IconWrapper from '../shared/IconWrapper';
import { useSelectedChannel, Selection } from "../../store/useSelectedChannel";
import CreateChannelModal from "./CreateChannelModal";
import { useMe } from "../../hooks/useMe";
import { useSelectedGuild } from "../../store/useSelectedGuild";

export interface Props { };

const ChannelSidebar: React.FC<Props> = () => {

    const { select, selectedChannel } = useSelectedChannel();
    const selectedGuild = useSelectedGuild(state => state.selectedGuild);
    const disclosure = useDisclosure();
    const { data, isLoading } = useMe();

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
                    marginBottom="var(--grid-gap)"
                >
                    <VStack paddingTop="calc(var(--tidify-logo-height) + 20px)" spacing="5px" p="calc(var(--tidify-logo-height) + 20px) 10px 0 10px">
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
                                <Section title="Members" icon={Users} onClick={() => select('members')}  isSelected={selectedChannel === 'members'}/>
                                <Section title="Calendar" icon={Calendar} onClick={() => select('calendar')} isSelected={selectedChannel === 'calendar'} />
                                <Section title="Kanban Board" icon={Trello} onClick={() => select('kanban')}  isSelected={selectedChannel === 'kanban'}/>
                                <Section title="Github Notifications" icon={GitHub} onClick={() => select('github')} isSelected={selectedChannel === 'github'} />

                                <SectionDivider title="Channels" icon={Plus} onClick={disclosure.onOpen} />

                                <TextChannel name="general" onClick={() => select('text')} />
                                <TextChannel name="talk" onClick={() => select('text')} />

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
                                <IconWrapper icon={LogOut} tooltip={{ label: "Logout", placement: "top" }} h="17px" w="17px" />
                                <IconWrapper icon={Settings} tooltip={{ label: "Settings", placement: "top" }} h="17px" w="17px" />
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
    isSelected: boolean;
    onClick: () => void;
}

const Section: React.FC<SectionProps> = ({ icon: Icon, title, onClick, isSelected }) => {
    return (
        <Box
            onClick={onClick}
            bg={isSelected ? "white" : "var(--background-secondary)"}
            cursur={isSelected ? 'pointer' : undefined}
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
                <Icon color="white" className="section"  filter={!isSelected ? undefined : "invert(62%) sepia(6%) saturate(652%) hue-rotate(227deg) brightness(86%) contrast(91%)"}/>
                <Text color={isSelected ? undefined : "white"} filter={!isSelected ? undefined : "invert(62%) sepia(6%) saturate(652%) hue-rotate(227deg) brightness(86%) contrast(91%)"} fontWeight="bold" className="section">{title}</Text>
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