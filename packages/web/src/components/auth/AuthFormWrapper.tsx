import { Container, Box, Center, Image } from "@chakra-ui/react";
import React from "react";
import Logo from '../../assets/logo.png';

export interface Props { };

const AuthFormWrapper: React.FC<Props> = ({ children }) => {
    return (
        <Container h="100%" d="flex" alignItems="center">
            <Box p="20px" bg="var(--background-primary)" borderRadius="10px" d="block" w="100%">
                <Center>
                    <Image src={Logo} alt="logo" />
                </Center>
                {children}
            </Box>
        </Container>
    );
}

export default AuthFormWrapper;