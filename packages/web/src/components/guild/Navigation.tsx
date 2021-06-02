import { Box, Center, Text, VStack, } from "@chakra-ui/layout"
import { Image } from '@chakra-ui/react';
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
                zIndex="5"
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
                <Guild />
                <Guild />
                <Guild />
                <Guild />
                <Guild />
            </VStack>

        </>
    );
}

export default Navigation;

const Guild: React.FC = () => {
    return (
        <Box
            w="50px"
            h="50px"
            borderRadius="10px"
            zIndex="5"
            bg="#9B91A1"
        >
            <Center>
                <Text fontWeight="bold" color="white" fontSize="xl">T1</Text>
            </Center>
        </Box>
    );
}