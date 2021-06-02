import {Box, Text} from '@chakra-ui/react';
import { Hash } from 'react-feather';

export interface Props {
    name: string;
};

const Title: React.FC<Props> = ({ name }) => {
    return (
        <>
            <Box 
                flex="1"
                borderRadius="15px"
                bg="var(--background-secondary-alt)"
                margin="10px"
                p="10px"
            >
                <Text fontSize="2xl" color="var(--text-primary)" d="flex" alignItems="center" h="100%">
                    <Hash color="var(--text-primary)" />{name}
                </Text>

            </Box>
        </>
    );
}

export default Title;