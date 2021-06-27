import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, UseDisclosureProps } from '@chakra-ui/react';
import { GuildAttributes } from '@tidify/common';
import { Form, Formik } from 'formik';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createGuild } from '../../api/guild';
import { useMe } from '../../hooks/useMe';
import { Response } from '../../types';
import FormInput from '../auth/FormInput';

export interface Props {
    disclosure: UseDisclosureProps;
};

const CreateGuildModal: React.FC<Props> = ({ disclosure: { onClose, isOpen }, children }) => {

    const { data, isLoading } = useMe();

    const queryClient = useQueryClient();

    const mutation = useMutation(createGuild, {
        onMutate: async (name: string) => {
            await queryClient.cancelQueries("guilds");

            const snapshot = queryClient.getQueryData<Response<GuildAttributes[]>>("guilds");

            snapshot && queryClient.setQueryData<Response<GuildAttributes[]>>("guilds", prev => ({
                data: [
                    ...snapshot.data,
                    { name, id: Math.random(), ownerId: data.data.userId },
                ],
                message: prev!.message,
                success: prev!.success
            }));

            return { snapshot };
        },
        onError: (_, __, context) => {
            if (context?.snapshot) {
                queryClient.setQueryData<Response<GuildAttributes[]>>('guilds', context.snapshot);
            }
        },
        onSettled: () => queryClient.invalidateQueries("guilds"),
    })

    return (
        <>
            <Modal isOpen={isOpen!} onClose={onClose!} isCentered >
                <ModalOverlay />
                <ModalContent bg="var(--background-secondary)">
                    <ModalHeader color="white">Create new Guild</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        paddingBottom="24px"
                    >
                        <Formik
                            initialValues={{ name: '' }}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true);
                                mutation.mutate(values.name);

                                onClose && onClose();
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <FormInput
                                        isInvalid={!!errors.name && touched.name}
                                        name="name" type="text" placeholder="Guild name"
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

export default CreateGuildModal;