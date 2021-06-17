import React from 'react';
import { Formik, Form } from 'formik';
import AuthFormWrapper from './AuthFormWrapper';
import { VStack, Text } from '@chakra-ui/react';
import Button from "../../ui/Button";
import { useMutation } from 'react-query';
import { reqPasswordReset } from '../../api/auth';
import FormInput from './FormInput';

const RequestPasswordReset: React.FC = () => {
    const [_, setMessage] = React.useState(false);

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

export default RequestPasswordReset;