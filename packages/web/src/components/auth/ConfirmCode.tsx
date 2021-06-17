import React from 'react';
import { Formik, Form } from 'formik';
import { History } from 'history';
import { Redirect, withRouter } from 'react-router-dom';
import { Button } from '@chakra-ui/button';
import { VStack, } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { confirmCode } from '../../api/auth';
import FormInput from './FormInput';
import { useAlerts } from '../../store/useAlerts';

type ConfirmCodeProps = {
    history: History;
}

const ConfirmCode: React.FC<ConfirmCodeProps> = () => {
    const [redirect, setRedirect] = React.useState(false);
    const { add } = useAlerts();
    const mutation = useMutation(confirmCode, {
        onSuccess: (data) => {
            if (data.success) {
                add(data.message, "success");
                setRedirect(true);
            }
        }
    });

    if (redirect) return <Redirect to="/auth/login" />

    return (
        <Formik
            initialValues={{ code: '' }}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                mutation.mutate(values.code);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form style={{ padding: '20px', borderRadius: '10px', background: 'var(--background-secondary)' }}>
                    <VStack spacing="10px">
                        <FormInput
                            isInvalid={!!errors.code && touched.code}
                            placeholder="Code" type="text" name="code"
                            errorMessage={errors.code}
                            label="Code:"
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
            )}
        </Formik>
    );
}

export default withRouter(ConfirmCode);
