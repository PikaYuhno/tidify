import { Box, Center, Divider, Text, VStack, } from "@chakra-ui/layout"
import { Image, Tooltip } from '@chakra-ui/react';
import Logo from '../../assets/logo.png'

export interface Props { };

const Navigation: React.FC<Props> = (props) => {
    return (
        <>
            <Box
                position="absolute"
                top="0"
                left="0"
                borderRadius="0 0 20px 0"
                w="auto"
                h="auto"
                bg="#706779"
                p="20px"
                zIndex="4"
            >
                <Image src={Logo} alt="logo" h="60px" w="auto" />
            </Box>

            <VStack
                position="fixed"
                h="100vh"
                w="70px"
                bg="#706779"
                spacing="10px"
                marginTop="var(--tidify-logo-height)"
            >
                <Divider w="80%" />
                <Guild name="T1" />
                <Guild name="T1" />
                <Guild name="T1" />
                <Guild name="T1" />
            </VStack>

        </>
    );
}

export default Navigation;

type GuildProps = {
    name: string;
}

const Guild: React.FC<GuildProps> = ({ name }) => {
    return (
        <Tooltip label={name} placement="right" hasArrow gutter={16} bg="var(--background-primary)">
            <Box
                w="50px"
                h="50px"
                borderRadius="10px"
                zIndex="6"
                bg="#9B91A1"
                transition="all 200ms ease"
                sx={{
                    "&:hover": {
                        bg: 'white',
                        cursor: 'pointer',
                        transform: 'scale(1.1)'
                    },
                    "&:hover #guild-text": {
                        color: 'var(--background-secondary)',
                    }
                }}
            >
                <Center>
                    <Text fontWeight="bold" color="white" fontSize="xl" id="guild-text">{name}</Text>
                </Center>
            </Box>
        </Tooltip>
    );
}