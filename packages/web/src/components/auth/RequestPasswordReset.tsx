import React from 'react';
import { Formik, Field, Form } from 'formik';
import styled from 'styled-components';
import AuthFormWrapper from './AuthFormWrapper';
import { VStack, FormControl, FormLabel, Input, FormErrorMessage, Button, Text } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { confirmCode, reqPasswordReset } from '../../api/auth';
import FormInput from './FormInput';

const RequestPasswordReset: React.FC = () => {
    const [message, setMessage] = React.useState(false);

    const mutation = useMutation(reqPasswordReset, {
        onSuccess: (data) => { data.success && setMessage(true) }
    });
    return (
        <Formik
            initialValues={{ email: '' }}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                mutation.mutate(values.email);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <AuthFormWrapper>
                    <Text fontSize="3xl" color="white">
                        Request New Password
                    </Text>
                    <Form style={{ padding: '20px', borderRadius: '10px', background: '#3f9996' }}>
                        <VStack spacing="10px">
                            <FormInput
                                isInvalid={!!errors.email && touched.email}
                                placeholder="E-Mail" type="email" name="email"
                                errorMessage={errors.email}
                                label="E-Mail"
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

export default RequestPasswordReset;