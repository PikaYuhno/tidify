import { Field, Form, Formik } from 'formik';
import styled from 'styled-components';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import React from 'react';
import ConfirmCode from './ConfirmCode';
import { Redirect } from 'react-router-dom';
import AuthFormWrapper from './AuthFormWrapper';
import { VStack, FormControl, FormLabel, Input, FormErrorMessage, Button, Text, HStack } from '@chakra-ui/react';
import { useMe } from '../../hooks/useMe';
import Loader from '../shared/Loader';
import { useMutation } from 'react-query';
import { login } from '../../api/auth';
import { History } from 'history';
import FormInput from './FormInput';
import { useAlerts } from '../../store/useAlerts';

type LoginProps = {
    history: History;
}

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
});

const Login: React.FC<LoginProps> = ({ history }) => {
    const [confirmCode, setConfirmCode] = React.useState(false);
    console.log("ConfirmCOde", confirmCode);
    const { data, isLoading } = useMe();
    const { add } = useAlerts();
    const mutation = useMutation(login, {
        onSuccess: (data) => {
            add(data.message, data.success ? "success" : "error")
            setConfirmCode(data.redirect ? data.redirect : false)
            if (!data.redirect)
                history.push("/");
        }
    });

    if (isLoading) return <Loader />

    if (data.success) {
        return <Redirect to="/" />
    }

    return (
        <>
            <Formik
                validationSchema={schema}
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    mutation.mutate(values);
                    setSubmitting(false);
                }}
            >{({
                errors, isSubmitting, touched
            }) => (
                <AuthFormWrapper>
                    <Text fontSize="3xl" color="white">
                        {confirmCode ? "Confirm Code" : "Login"}
                    </Text>
                    {!confirmCode && <>
                        <Form style={{ padding: '20px', borderRadius: '10px', background: '#3f9996' }}>
                            <VStack spacing="10px">
                                <FormInput
                                    isInvalid={!!errors.email && touched.email}
                                    placeholder="E-Mail" type="email" name="email"
                                    errorMessage={errors.email}
                                    label="E-Mail"
                                />
                                <FormInput
                                    isInvalid={!!errors.password && touched.password}
                                    placeholder="password" type="password" name="password"
                                    errorMessage={errors.password}
                                    label="Password"
                                />
                                <Button
                                    w="100%"
                                    mt={4}
                                    bg="#99d0ce"
                                    isLoading={isSubmitting}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </VStack>

                        </Form>

                        <HStack marginTop="10px">
                            <Button colorScheme="teal" size="xs" onClick={() => history.push("/")}>
                                back to home
                            </Button>
                            <Button colorScheme="teal" size="xs" onClick={() => history.push("/auth/register")}>
                                new account?
                            </Button>
                        </HStack>
                    </>
                    }
                    {confirmCode && <>
                        <ConfirmCode />
                        <Button colorScheme="teal" size="xs" marginTop="10px">
                            Go Back
                        </Button>
                    </>}
                </AuthFormWrapper>
            )}
            </Formik>
        </>
    );
}

export default Login;
