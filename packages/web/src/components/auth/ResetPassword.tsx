import React from 'react';
import { Formik, Field, Form } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { VStack, FormControl, FormLabel, Input, FormErrorMessage, Button, Text } from '@chakra-ui/react';
import AuthFormWrapper from './AuthFormWrapper';
import { useMutation } from 'react-query';
import { confirmCode, resetPassword } from '../../api/auth';
import FormInput from './FormInput';

interface MatchParams {
    token: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

// @todo add styling
const ResetPassword: React.FC<Props> = ({ match }) => {

    const mutation = useMutation(resetPassword, {});
    return (
        <Formik
            initialValues={{ newPassword: '', confirmPassword: '', token: '' }}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                if (values.newPassword !== values.confirmPassword) {
                    return;
                };
                mutation.mutate(values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <>
                    <AuthFormWrapper>
                        <Text fontSize="3xl" color="white">
                            Change Password
                    </Text>
                        <Form style={{ padding: '20px', borderRadius: '10px', background: '#3f9996' }}>
                            <VStack spacing="10px">
                                <FormInput
                                    isInvalid={!!errors.newPassword && touched.newPassword}
                                    placeholder="new password" type="password" name="newPassword"
                                    errorMessage={errors.newPassword}
                                    label="New Password"
                                />
                                <FormInput
                                    isInvalid={!!errors.confirmPassword && touched.confirmPassword}
                                    placeholder="confirm password" type="password" name="confirmPassword"
                                    errorMessage={errors.confirmPassword}
                                    label="Confirm Password"
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
                    </AuthFormWrapper>
                </>
            )}
        </Formik>
    );
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
    max-height: 90vh;
`;

export default ResetPassword;