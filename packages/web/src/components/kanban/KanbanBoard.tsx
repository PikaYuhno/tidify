import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box, Center, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { Plus } from "react-feather";
import BoxWrapper from "../shared/BoxWrapper";

export interface Props { };

const KanbanBoard: React.FC<Props> = () => {
    return (
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
                    <KanbanColumn title={"todo"} taskCount={2}>
                        <KanbanTask date={"Dec 24"} content={"make things"} />
                        <KanbanTask date={"Dec 25"} content={"update database"} />
                    </KanbanColumn>
                    <KanbanColumn title={"in progress"} taskCount={2}>
                        <KanbanTask date={"Dec 25"} content={"play fortnite"} />
                    </KanbanColumn>
                    <KanbanColumn title={"finished"} taskCount={0}></KanbanColumn>
                </HStack>

            </VStack>
        </BoxWrapper>
    );
}

type KanbanColumnProps = {
    title: string;
    taskCount: number;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, taskCount, children }) => {
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
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            w="100%"
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
                        {children}
                    </VStack>

                </Box>

            </Box>
        </>
    );
}

type KanbanTaskProps = {
    date: string;
    content: string;
}

const KanbanTask: React.FC<KanbanTaskProps> = ({ date, content }) => {
    return (
        <Box
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