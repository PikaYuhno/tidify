import { Input, InputProps } from "@chakra-ui/input"
import { Box, Flex } from "@chakra-ui/layout"
import { Field, Form, Formik } from "formik"
import { Smile } from "react-feather"

export interface Props { };

const ChatInput: React.FC<Props> = () => {
    return (
        <>
            <Formik
                initialValues={{
                    content: ''
                }}
                onSubmit={() => { }}
            >
                {() => (
                    <Flex
                        flex="1"
                        alignItems="center"
                        w="100%"
                    >
                        <Form style={{ width: '100%' }}>
                            <Box
                                bg="var(--background-secondary)"
                                borderRadius="10px"
                                d="flex"
                                alignItems="center"
                                w="100%"
                                p="0 10px"
                            >
                                <Field as={FormInput} type="text" placeholder="Message" name="content" />
                                <Flex>
                                    <Smile color="white" />
                                </Flex>
                            </Box>
                        </Form>
                    </Flex>
                )}
            </Formik>
        </>
    );
}

const FormInput: React.FC<InputProps> = (props) => {
    return (
        <Input {...props} outline="none" boxShadow="none" border="none" bg="transparent" color="var(--text-primary)" focusBorderColor="transparent" />
    )
}

export default ChatInput;