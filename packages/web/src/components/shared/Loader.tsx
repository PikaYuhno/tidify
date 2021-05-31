import { Spinner } from '@chakra-ui/spinner';
import styled from 'styled-components'

export interface Props {};

const Loader: React.FC<Props> = (props) => {
    return (
        <Container>
            <Spinner size="xl" color="var(--background-primay)" />
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    right: 0;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;


export default Loader;