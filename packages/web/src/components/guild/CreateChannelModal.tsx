import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, UseDisclosureProps } from '@chakra-ui/react';
import { ChannelAttributes } from '@tidify/common';
import { Form, Formik } from 'formik';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createGuild } from '../../api/guild';
import { Response } from '../../types';
import FormInput from '../auth/FormInput';

export interface Props {
    disclosure: UseDisclosureProps;
};

const CreateChannelModal: React.FC<Props> = ({ disclosure: { onClose, isOpen }, children }) => {

    const queryClient = useQueryClient();


    const mutation = useMutation(createGuild, {
        onMutate: (name: string) => {
            queryClient.cancelQueries("channels");

            const snapshot = queryClient.getQueryData<Response<ChannelAttributes[]>>("channels");

            snapshot && queryClient.setQueryData<Response<ChannelAttributes[]>>("channels", prev => ({
                data: [
                    ...snapshot.data,
                    { name, id: Math.random(), guildId: 2 },
                ],
                message: prev!.message,
                success: prev!.success
            }));

            return { snapshot };
        },
        onError: (_, __, context) => {
            if (context?.snapshot) {
                queryClient.setQueryData<Response<ChannelAttributes[]>>('channels', context.snapshot);
            }
        },
        onSettled: () => queryClient.invalidateQueries("channels"),
    })

    return (
        <>
            <Modal isOpen={isOpen!} onClose={onClose!} isCentered >
                <ModalOverlay />
                <ModalContent bg="var(--background-secondary)">
                    <ModalHeader color="white">Create new channel</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        paddingBottom="24px"
                    >
                        <Formik
                            initialValues={{ name: '' }}
                            onSubmit={(values) => {
                                mutation.mutate(values.name);
                            }}
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