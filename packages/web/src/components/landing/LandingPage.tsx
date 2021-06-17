import { Button } from "@chakra-ui/button";
import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/layout";
import CornerLogo from "../shared/CornerLogo";
import { History } from "history";

interface Props {
    history: History;
}

const LandingPage: React.FC<Props> = ({ history }) => {
    return (
        <>
            <Box
                w="100%"
                h="100%"
                position="absolute"
                bg="var(--background-secondary-alt)"
            >
                <CornerLogo />

                <Box
                    bottom="0"
                    right="0"
                    position="absolute"
                    h="90%"
                    w="360px"
                    bg="var(--background-secondary)"
                    borderTopLeftRadius="40px"
                ></Box>

                <HStack
                    borderTopLeftRadius="20px"
                    borderTopRightRadius="20px"
                    bg="white"
                    position="absolute"
                    right="0"
                    bottom="80%"
                    p="10px"
                    zIndex="5"
                    w="325px"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text color="var(--background-primary)" fontSize="2xl">
                        about us.
					</Text>
                    <Divider orientation="vertical"/>
                    <Text color="var(--background-primary)" fontSize="2xl">
                        log in.
					</Text>
                    <Divider orientation="vertical" />
                    <Text color="var(--background-primary)" fontSize="2xl">
                        sign up.
					</Text>
                </HStack>

                <Box
                    bottom="0"
                    right="0"
                    position="absolute"
                    h="80%"
                    w="85%"
                    bg="var(--background-primary)"
                    borderTopLeftRadius="40px"
                    zIndex="1"
                    paddingTop="70px"
                    paddingLeft="70px"
                >
                    <VStack spacing={1} alignItems="flex-start">
                        <Text fontSize="4xl" color="white">
                            manage your teams,
						</Text>
                        <Text fontSize="4xl" fontWeight="bold" color="white">
                            with ease.
						</Text>
                        <Text fontSize="md" fontWeight="bold" color="white">
                            a project management tool with the user in mind.
						</Text>
                        <Button
                            size="md"
                            bg="var(--background-secondary)"
                            color="white"
                            onClick={() => history.push("/app")}
                        >
                            get started now.
						</Button>
                    </VStack>
                </Box>

                <Box
                    bottom="0"
                    right="0"
                    position="absolute"
                    h="50%"
                    w="95%"
                    bg="var(--background-secondary)"
                    borderTopLeftRadius="40px"
                />

                <Box
                    bottom="0"
                    right="0"
                    position="absolute"
                    h="75%"
                    w="90%"
                    bg="var(--background-secondary)"
                    borderTopLeftRadius="40px"
                />

                <Box
                    bottom="0"
                    right="0"
                    position="absolute"
                    h="85%"
                    w="80%"
                    bg="var(--background-secondary)"
                    borderTopLeftRadius="40px"
                />

                <Box
                    bottom="0"
                    right="0"
                    position="absolute"
                    h="35%"
                    w="55%"
                    bg="var(--background-secondary)"
                    borderTopLeftRadius="40px"
                    zIndex="5"
                />

                <Box
                    bottom="0"
                    right="0"
                    position="absolute"
                    h="35%"
                    w="60%"
                    bg="var(--background-secondary-alt)"
                    borderTopLeftRadius="40px"
                    zIndex="4"
                />

                <Box
                    bottom="0"
                    right="0"
                    position="absolute"
                    h="70%"
                    w="35%"
                    bg="var(--background-secondary)"
                    borderTopLeftRadius="40px"
                    zIndex="3"
                />

                <Box
                    bottom="0"
                    right="0"
                    position="absolute"
                    h="70%"
                    w="40%"
                    bg="var(--background-secondary-alt)"
                    borderTopLeftRadius="40px"
                    zIndex="2"
                />
            </Box>
        </>
    );
};

export default LandingPage;

