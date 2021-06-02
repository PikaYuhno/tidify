import { Spinner } from '@chakra-ui/spinner';
import { Box } from '@chakra-ui/react';

export interface Props { };

const Loader: React.FC<Props> = (props) => {
    return (
        <Box
            position="absolute"
            h="100vh"
            w="100vw"
            top="0"
            right="right"

            d="flex"
            justifyContent="center"
            alignItems="center"

        >

            <Spinner size="xl" color="var(--background-primary)" />
        </Box>
    );
}


export default Loader;