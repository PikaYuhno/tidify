import { Avatar } from "@chakra-ui/avatar";
import { Box, VStack, HStack, Text } from "@chakra-ui/layout";

export interface Props { };

const Members: React.FC<Props> = (props) => {
    return (
        <Box
            flex="1"
            h="100%"
            bg="var(--background-secondary-alt)"
            p="5px"
        >
            <VStack p="5px" w="100%">
                <MemberSubList title="Captain">
                    <MemberItem name="Teamleiter" />
                </MemberSubList>
                <MemberSubList title="Members">
                    <MemberItem name="PikaYuhno" />
                </MemberSubList>
            </VStack>
        </Box>
    );
}

type MemberSubListProps = {
    title: string
}

const MemberSubList: React.FC<MemberSubListProps> = ({ title, children }) => {
    return (
        <VStack
            h="auto"
            bg="var(--background-secondary)"
            borderRadius="10px"
            w="100%"
            p="5px"
        >
            <Text color="white" textAlign="start" w="100%" paddingRight="5px" textTransform="uppercase" fontWeight="bold" fontSize="14px">{title}</Text>
            {children}
        </VStack>
    );
}

type MemberItemProps = {
    name: string;
}

const MemberItem: React.FC<MemberItemProps> = ({ name }) => {
    return (
        <HStack justifyContent="flex-start" w="100%" p="5px" sx={{
            "&:hover": {
                bg: 'var(--background-secondary-alt)',
                borderRadius: '10px',
                cursor: 'pointer'
            }
        }}>
            <Avatar size="sm" />
            <Text color="var(--text-primary)" fontWeight="bold">{name}</Text>
        </HStack>
    );
}

export default Members;