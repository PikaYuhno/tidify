import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, UseDisclosureProps } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import FormInput from '../auth/FormInput';

export interface Props {
    disclosure: UseDisclosureProps;
};

const CreateChannelModal: React.FC<Props> = ({ disclosure: { onClose, isOpen }, children }) => {

    return (
        <>
            <Modal isOpen={isOpen!} onClose={onClose!}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new channel</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                        initialValues={{ name: '' }}
                        onSubmit={() => {}}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <FormInput 
                                        isInvalid={!!errors.name && touched.name}
                                        name="name" type="text" placeholder="Channel name"
                                        errorMessage={errors.name}
                                        label="Name"
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
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateChannelModal;