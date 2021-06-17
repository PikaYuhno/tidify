import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import ConfirmCode from "./ConfirmCode";
import { Redirect } from "react-router-dom";
import { VStack, Text, HStack } from "@chakra-ui/react";
import Button from "../../ui/Button";
import AuthFormWrapper from "./AuthFormWrapper";
import { useMutation } from "react-query";
import { register } from "../../api/auth";
import { useMe } from "../../hooks/useMe";
import Loader from "../shared/Loader";
import FormInput from "./FormInput";
import { useAlerts } from "../../store/useAlerts";
import { History } from "history";

type RegisterProps = {
    history: History;
};

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
});

const Register: React.FC<RegisterProps> = ({ history }) => {
    const [confirmCode, setConfirmCode] = React.useState(false);
    const { data, isLoading } = useMe();
    const { add } = useAlerts();
    const mutation = useMutation(register, {
        onSuccess: (data) => {
            add(data.message, data.success ? "success" : "error");
            data.success && setConfirmCode(true);
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
                    firstName: "",
                    lastName: "",
                    username: "",
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
                            {confirmCode ? "Confirm Code" : "Register"}
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
                                            isInvalid={!!errors.firstName && touched.firstName}
                                            placeholder="first name"
                                            type="text"
                                            name="firstName"
                                            errorMessage={errors.firstName}
                                            label="First name"
                                        />
                                        <FormInput
                                            isInvalid={!!errors.lastName && touched.lastName}
                                            placeholder="last name"
                                            type="text"
                                            name="lastName"
                                            errorMessage={errors.lastName}
                                            label="Last name"
                                        />
                                        <FormInput
                                            isInvalid={!!errors.username && touched.username}
                                            placeholder="username"
                                            type="text"
                                            name="username"
                                            errorMessage={errors.username}
                                            label="Username"
                                        />
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
                                            placeholder="Password"
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
                                        onClick={() => history.push("/auth/login")}
                                    >
                                        go to login
									</Button>
                                </HStack>
                            </>
                        )}
                        {confirmCode && (
                            <>
                                <ConfirmCode />
                                <Button
                                    bg="var(--background-secondary)"
                                    color="var(--text-primary)"
                                    size="xs"
                                    marginTop="10px"
                                >
                                    Go Back
								</Button>
                            </>
                        )}
                    </AuthFormWrapper>
                )}
            </Formik>
        </>
    );
};

export default Register;
