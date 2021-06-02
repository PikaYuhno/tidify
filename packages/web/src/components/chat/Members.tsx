import { Avatar } from "@chakra-ui/avatar";
import { Box, VStack, HStack, Text } from "@chakra-ui/layout";

export interface Props { };

const Members: React.FC<Props> = (props) => {
    return (
        <Box
            flex="1"
            h="100%"
            bg="var(--background-secondary-alt)"
            p="10px"
        >
            <VStack>

            </VStack>
            <VStack
                h="auto"
                bg="var(--background-secondary)"
                borderRadius="10px"
                p="5px"
            >
                <MemberItem name="PikaYuhno" />
                <MemberItem name="Teamleiter" />
            </VStack>
        </Box>
    );
}

type MemberSubListProps = {
    title: string
}

const MemberSubList: React.FC<MemberSubListProps> = ({ title }) => {
    return (
        <VStack
            h="auto"
            bg="var(--background-secondary)"
            borderRadius="10px"
            p="5px"
        >
            <MemberItem name="PikaYuhno" />
            <MemberItem name="Teamleiter" />
        </VStack>
    );
}

type MemberItemProps = {
    name: string;
}

const MemberItem: React.FC<MemberItemProps> = ({ name }) => {
    return (
        <HStack justifyContent="flex-start" w="100%" p="5px">
            <Avatar size="sm" />
            <Text color="var(--text-primary)">{name}</Text>
        </HStack>
    );
}

export default Members;