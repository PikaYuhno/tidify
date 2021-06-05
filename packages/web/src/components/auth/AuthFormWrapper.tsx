import { Container, Box, Center, Image, ContainerProps } from "@chakra-ui/react";
import React from "react";
import Logo from '../../assets/logo.png';

type Props = { 
    [P in keyof ContainerProps]?: ContainerProps[P];
};

const AuthFormWrapper: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <Container h="100%" d="flex" alignItems="center" {...rest}>
            <Box p="20px" bg="var(--background-secondary-alt)" borderRadius="10px" d="block" w="100%">
                <Center>
                    <Image src={Logo} alt="logo" />
                </Center>
                {children}
            </Box>
        </Container>
    );
}

export default AuthFormWrapper;