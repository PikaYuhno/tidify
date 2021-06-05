import React from "react"
import { Box } from "@chakra-ui/react"

export interface IBoxWrapperProps { };

const BoxWrapper: React.FC<IBoxWrapperProps> = ({ children }) => {
    return (
        <Box
            p="20px"
            w="100%"
        >
            <Box
                h="100%"
                bg="var(--background-secondary-alt)"
                p="20px"
                borderRadius="10px"
            >
                {children}
            </Box>
        </Box>
    );
}

export default BoxWrapper;