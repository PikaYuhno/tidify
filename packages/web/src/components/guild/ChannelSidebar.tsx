import { VStack, Box, Text, HStack, Avatar, } from "@chakra-ui/react";
import { Calendar, Grid, Icon, Plus, Trello, Users, Hash, LogOut, Settings } from 'react-feather';
import React from "react";
import IconWrapper from '../shared/IconWrapper';

export interface Props { };

const ChannelSidebar: React.FC<Props> = (props) => {

    const handleCreateChannel = () => {

    }

    return (

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
                    <Section title="Overview" icon={Grid} />
                    <Section title="Members" icon={Users} />
                    <Section title="Calendar" icon={Calendar} />
                    <Section title="Kanban Board" icon={Trello} />

                    <SectionDivider title="Channels" icon={Plus} onClick={handleCreateChannel} />

                    <TextChannel name="general" />
                    <TextChannel name="talk" />
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
    );
}


type TextChannelProps = {
    name: string;
}

const TextChannel: React.FC<TextChannelProps> = ({ name }) => {
    return (
        <Box
            bg="var(--background-secondary)"
            borderRadius="5px"
            d="flex"
            justifyContent="flex-start"
            alignItems="center"
            p="8px"
            w="100%"
        >
            <HStack>
                <Hash color="white" />
                <Text color="white" fontWeight="bold">{name}</Text>
            </HStack>
        </Box>
    );
}

type SectionProps = {
    icon: Icon;
    title: string;
}

const Section: React.FC<SectionProps> = ({ icon: Icon, title }) => {
    return (
        <Box
            bg="var(--background-secondary)"
            borderRadius="5px"
            d="flex"
            justifyContent="flex-start"
            alignItems="center"
            p="8px"
            w="100%"
        >
            <HStack>
                <Icon color="white" />
                <Text color="white" fontWeight="bold">{title}</Text>
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