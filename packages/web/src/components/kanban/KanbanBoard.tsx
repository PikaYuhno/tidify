import React from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box, Center, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { Plus } from "react-feather";
import BoxWrapper from "../shared/BoxWrapper";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DroppableProvided,
    DraggableLocation,
    DropResult,
    DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot
} from 'react-beautiful-dnd';
import { ColumnAttributes, TaskAttributes } from "@tidify/common";
import { move, reorder } from '../../utils/dnd';

export interface Props { };

// make drops smooth
const KanbanBoard: React.FC<Props> = () => {
    const [tasks, setTasks] = React.useState<TaskAttributes[]>([
        {
            id: 1,
            colId: 1,
            description: "play fortnite",
            name: "cool name",
            userId: 2
        }
    ]);
    const [columns, setColumns] = React.useState<ColumnAttributes[]>([
        {
            id: 1,
            amount: tasks.length,
            boardId: 1,
            order: 1,
            name: "todo",
            tasks: tasks
        },
        {
            id: 2,
            amount: tasks.length,
            boardId: 1,
            order: 2,
            name: "in progress",
            tasks: [
                {
                    id: 2,
                    colId: 1,
                    description: "play another thing",
                    name: "cool name",
                    userId: 2
                },
                {
                    id: 8,
                    colId: 1,
                    description: "play another thing 8",
                    name: "cool name",
                    userId: 2
                }
            ]
        },
        {
            id: 3,
            amount: tasks.length,
            boardId: 3,
            order: 3,
            name: "done",
            tasks: [

                {
                    id: 3,
                    colId: 1,
                    description: "play another thing 2",
                    name: "cool name",
                    userId: 2
                }
            ]
        }
    ]);
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const col = columns.find(el => el.id.toString() === source.droppableId)!;
            const tasks = reorder(
                col.tasks!,
                source.index,
                destination.index
            );
            setColumns(prev => prev.map(item => item.id.toString() === source.droppableId ? { ...col, tasks } : item))

        } else {
            const sourceCol = columns.find(el => el.id.toString() === source.droppableId)!;
            const destCol = columns.find(el => el.id.toString() === destination.droppableId)!;
            const resultFromMove = move(
                sourceCol.tasks!,
                destCol.tasks!,
                source,
                destination
            );

            setColumns(prev => {
                return prev.map(item => {
                    if (item.id.toString() === source.droppableId) {
                        return { ...sourceCol, tasks: resultFromMove[source.droppableId] }
                    } else if (item.id.toString() === destination.droppableId) {
                        return { ...destCol, tasks: resultFromMove[destination.droppableId] }
                    }
                    return item;
                })
            })
        }

    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <BoxWrapper>
                <VStack h="100%" spacing={5}>

                    <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="start"
                    >
                        <Text fontSize="2xl" fontWeight="bold" color="var(--text-primary)">Admin Board</Text>
                    </Flex>
                    <Divider />
                    <HStack
                        alignItems="flex-start"
                        w="100%"
                        spacing={5}
                    >

                        {columns.map((item, i) => (
                            <KanbanColumn id={item.id} title={item.name} taskCount={2} tasks={item.tasks!} key={i}></KanbanColumn>
                        ))}

                    </HStack>

                </VStack>
            </BoxWrapper>
        </DragDropContext>
    );
}

type KanbanColumnProps = {
    id: number;
    title: string;
    taskCount: number;
    tasks: TaskAttributes[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, taskCount, tasks }) => {
    return (
        <>
            <Box
                w="280px"
                h="auto"
                bg="var(--background-secondary)"
                borderRadius="10px"
            >
                <Box
                >
                    <VStack
                        p="10px"
                        sx={{
                            "& > *": {
                                width: '100%'
                            }
                        }}
                        spacing={2}
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            h="100%"
                        >
                            <Text color="white" fontWeight="bold">{title}</Text>
                            <Center
                                h="32px"
                                w="32px"
                                border="1px solid var(--background-primary)"
                                borderRadius="5px"
                                color="white"
                            >
                                {taskCount}
                            </Center>
                        </Flex>
                        <Button
                            w="100%"
                            bg="var(--background-primary)"
                        >
                            <Plus color="var(--background-secondary-alt)" />
                        </Button>
                        <Droppable droppableId={id.toString()}>
                            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                <VStack
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {tasks.map((item, i) => (
                                        <Draggable key={item.id} draggableId={item.id.toString()} index={i}>
                                            {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                                                <KanbanTask
                                                    date={"Dec 23"}
                                                    content={item.description}
                                                    providedDraggable={providedDraggable}
                                                />
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </VStack>
                            )}
                        </Droppable>
                    </VStack>

                </Box>

            </Box>
        </>
    );
}

type KanbanTaskProps = {
    date: string;
    content: string;

    providedDraggable: DraggableProvided;
}

const KanbanTask: React.FC<KanbanTaskProps> = ({ date, content, providedDraggable }) => {
    return (
        <Box
            ref={providedDraggable.innerRef}
            {...providedDraggable.draggableProps}
            {...providedDraggable.dragHandleProps}
            style={{ ...providedDraggable.draggableProps.style}}
            w="100%"
            borderRadius="10px"
            p="10px"
            bg="var(--background-primary)"
        >
            <VStack>
                <Flex
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Text fontSize="16px" fontWeight="bold" color="var(--text-primary)">{date}</Text>
                    <Avatar size="sm" />
                </Flex>
                <Text fontSize="md" color="white" textAlign="start" w="100%">{content}</Text>
                <Flex
                    flexWrap="wrap"
                    alignItems="flex-start"
                    w="100%"
                    sx={{
                        "& > *": {
                            margin: '3px'
                        }
                    }}
                >
                    <Tag size="sm">Sample</Tag>
                </Flex>
            </VStack>
        </Box>
    );
}

export default KanbanBoard;