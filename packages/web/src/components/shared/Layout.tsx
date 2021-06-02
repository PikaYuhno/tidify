import { Box } from "@chakra-ui/layout";

export interface Props {};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <Box h="100%" marginLeft="70px" d="flex">
            {children}
        </Box>
    );
}

export default Layout;