import { Center, HStack, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getBoards } from '../../api/board';
import { useSelectedGuild } from '../../store/useSelectedGuild';
import Button from '../../ui/Button';
import BoxWrapper from '../shared/BoxWrapper';
import CreateBoardModal from './CreateBoardModal';
import { BoardAttributes } from '@tidify/common';
import KanbanBoard from './KanbanBoard';

interface Props { };

const Boards: React.FC<Props> = () => {
    const disclosure = useDisclosure();
    const { onOpen } = disclosure;
    const selectedGuild = useSelectedGuild((state) => state.selectedGuild);
    const { data, isLoading } = useQuery(
        "boards",
        () => getBoards(selectedGuild?.id),
        { enabled: !!selectedGuild }
    );

    const [selectedBoard, selectBoard] = React.useState<BoardAttributes | null>(null);

    if (isLoading) return null;

    return (
        <>
            {!selectedBoard &&
                <BoxWrapper>
                    <VStack w="100%" spacing={5} alignItems="flex-start">
                        <Button onClick={onOpen}>Create new Board</Button>
                        <HStack>
                            {data && data.success && data.data.map((b: BoardAttributes) => (
                                <BoardBox key={b.id} title={b.title} onClick={() => selectBoard(b)} />
                            ))}
                        </HStack>
                    </VStack>
                </BoxWrapper>}
            {selectedBoard && <KanbanBoard board={selectedBoard!} />}
            <CreateBoardModal disclosure={disclosure} />
        </>
    );
}

type BoardBox = {
    title: string;
    onClick: () => void;
}

const BoardBox: React.FC<BoardBox> = ({ title, onClick }) => {
    return (
        <>
            <Center
                onClick={onClick}
                w="150px"
                h="100px"
                bg="var(--background-primary)"
                borderRadius="10px"
                transition="all 200ms ease-in-out"
                sx={{
                    "&:hover": {
                        cursor: 'pointer',
                        transform: 'scale(1.1)'
                    }
                }}
            >
                <Text color="white" fontWeight="bold">{title}</Text>
            </Center>
        </>
    );
}

export default Boards;