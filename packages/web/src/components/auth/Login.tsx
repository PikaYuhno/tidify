import { Form, Formik } from "formik";
import * as yup from "yup";
import React from "react";
import ConfirmCode from "./ConfirmCode";
import { Redirect } from "react-router-dom";
import AuthFormWrapper from "./AuthFormWrapper";
import { VStack, Text, HStack } from "@chakra-ui/react";
import Button from '../../ui/Button';
import { useMe } from "../../hooks/useMe";
import Loader from "../shared/Loader";
import { useMutation } from "react-query";
import { login } from "../../api/auth";
import { History } from "history";
import FormInput from "./FormInput";
import { useAlerts } from "../../store/useAlerts";
import LoginTransition from "../animations/LoginTransition";

type LoginProps = {
    history: History;
};

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
});

const Login: React.FC<LoginProps> = ({ history }) => {
    const [confirmCode, setConfirmCode] = React.useState(false);
    const [animationState, startAnimation] = React.useState(false);
    const { data, isLoading } = useMe();


    const { add } = useAlerts();
    const mutation = useMutation(login, {
        onSuccess: (data) => {
            add(data.message, data.success ? "success" : "error");
            setConfirmCode(data.redirect ? data.redirect : false);
            if (!data.redirect && data.success) {

                startAnimation(true);
            }
        },
    });

    if (isLoading) return <Loader />;

    if (data.success) {
        return <Redirect to="/app" />;
    }

    return (
        <>
            <Formik
                validationSchema={schema}
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    mutation.mutate(values);
                    setSubmitting(false);
                }}
            >
                {({ errors, isSubmitting, touched }) => (
                    <AuthFormWrapper>
                        <Text fontSize="3xl" color="white">
                            {confirmCode ? "Confirm Code" : "Login"}
                        </Text>
                        {!confirmCode && (
                            <>
                                <Form
                                    style={{
                                        padding: "20px",
                                        borderRadius: "10px",
                                        background: "var(--background-secondary)",
                                    }}
                                >
                                    <VStack spacing="10px">
                                        <FormInput
                                            isInvalid={!!errors.email && touched.email}
                                            placeholder="E-Mail"
                                            type="email"
                                            name="email"
                                            errorMessage={errors.email}
                                            label="E-Mail"
                                        />
                                        <FormInput
                                            isInvalid={!!errors.password && touched.password}
                                            placeholder="password"
                                            type="password"
                                            name="password"
                                            errorMessage={errors.password}
                                            label="Password"
                                        />
                                        <Button
                                            w="100%"
                                            mt={4}
                                            bg="var(--background-secondary-alt)"
                                            isLoading={isSubmitting}
                                            type="submit"
                                            color="var(--text-primary)"
                                        >
                                            Submit
										</Button>
                                    </VStack>
                                </Form>

                                <HStack marginTop="10px">
                                    <Button
                                        bg="var(--background-secondary)"
                                        color="var(--text-primary)"
                                        size="xs"
                                        onClick={() => history.push("/")}
                                    >
                                        back to home
									</Button>
                                    <Button
                                        bg="var(--background-secondary)"
                                        color="var(--text-primary)"
                                        size="xs"
                                        onClick={() => history.push("/auth/register")}
                                    >
                                        new account?
									</Button>
                                </HStack>
                            </>
                        )}
                        {confirmCode && (
                            <>
                                <ConfirmCode />
                                <Button colorScheme="teal" size="xs" marginTop="10px">
                                    Go Back
								</Button>
                            </>
                        )}
                    </AuthFormWrapper>
                )}
            </Formik>
            <LoginTransition
                animationState={animationState}
                startAnimation={startAnimation}
                redirectUrl="/app"
            />
        </>
    );
};

export default Login;
