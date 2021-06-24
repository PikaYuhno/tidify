import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { BoardAttributes, ColumnAttributes } from '@tidify/common';
import { Form, Formik } from 'formik';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createColumn } from '../../api/board';
import { Response } from '../../types';
import FormInput from '../auth/FormInput';

export interface Props {
    board: BoardAttributes | null;
    onClose: () => void;
};

const CreateColumnModal: React.FC<Props> = ({ onClose, board, children }) => {

    const queryClient = useQueryClient();

    const mutation = useMutation(createColumn, {
        onMutate: async (params: Omit<ColumnAttributes, "id" | "amount" | "order">) => {
            await queryClient.cancelQueries("columns");

            const snapshot = queryClient.getQueryData<Response<ColumnAttributes[]>>("columns");

            console.log("Snapshot", snapshot);

            snapshot && queryClient.setQueryData<Response<ColumnAttributes[]>>("columns", prev => ({
                data: [
                    ...snapshot.data,
                    {
                        name: params.name,
                        id: Math.random(),
                        boardId: params.boardId,
                        amount: 0,
                        order: 0,
                    },
                ],
                message: prev!.message,
                success: prev!.success
            }));

            return { snapshot };
        },
        onError: (_, __, context) => {
            if (context?.snapshot) {
                queryClient.setQueryData<Response<ColumnAttributes[]>>('columns', context.snapshot);
            }
        },
        onSettled: () => queryClient.invalidateQueries("columns"),
    })

    return (
        <>
            <Modal isOpen={!!board} onClose={onClose} isCentered >
                <ModalOverlay />
                <ModalContent bg="var(--background-secondary)">
                    <ModalHeader color="white">Create new Column</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        paddingBottom="24px"
                    >
                        <Formik
                            initialValues={{ name: '' }}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true);
                                mutation.mutate({
                                    name: values.name,
                                    boardId: board!.id,
                                });

                                onClose && onClose();
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <FormInput
                                        isInvalid={!!errors.name && touched.name}
                                        name="name" type="text" placeholder="Column name"
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

export default CreateColumnModal;