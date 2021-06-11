import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import React from "react";
import Logo from '../../assets/logo.png'

 interface Props {};

const CornerLogo: React.FC<Props> = () => {
    return (
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
    );
}

export default CornerLogo;