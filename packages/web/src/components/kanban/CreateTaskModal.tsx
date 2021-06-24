import { UseDisclosureProps, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button } from "@chakra-ui/react";
import { BoardAttributes, ColumnAttributes, TaskAttributes } from "@tidify/common";
import { Formik, Form } from "formik";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTask } from "../../api/column";
import { useMe } from "../../hooks/useMe";
import { Response } from "../../types";
import FormInput from "../auth/FormInput";

interface Props {
    column: ColumnAttributes | null;
    onClose: () => void;
};

const CreateTaskModal: React.FC<Props> = ({ onClose, column }) => {

    const queryClient = useQueryClient();
    const { data: me, isLoading } = useMe();

    const mutation = useMutation(createTask, {
        onMutate: (data: Omit<TaskAttributes, "id">) => {
            queryClient.cancelQueries("columns");

            const snapshot =
                queryClient.getQueryData<Response<ColumnAttributes[]>>("columns");

            // find columnd and update the tasks
            /**
             * {
                            id: Math.random(),
                            name: data.name,
                            description: "",
                            colId: column!.id,
                            userId: me.data.userId
                        }
             */
            snapshot &&
                queryClient.setQueryData<Response<ColumnAttributes[]>>(
                    "columns",
                    (prev) => ({
                        data: [
                            ...snapshot.data.map(c => {
                                if (column!.id === c.id)
                                    return {
                                        ...c, tasks: [...c.tasks!, {

                                            id: Math.random(),
                                            name: data.name,
                                            description: "test",
                                            colId: column!.id,
                                            userId: me.data.userId
                                        }]
                                    }
                                return c;
                            })
                        ],
                        message: prev!.message,
                        success: prev!.success,
                    })
                );

            return { snapshot };
        },
        onError: (_, __, context) => {
            if (context?.snapshot) {
                queryClient.setQueryData<Response<ColumnAttributes[]>>(
                    "columns",
                    context.snapshot
                );
            }
        },
        onSettled: () => queryClient.invalidateQueries("columns"),
    });
    return (
        <>
            <Modal isOpen={!!column} onClose={onClose} isCentered >
                <ModalOverlay />
                <ModalContent bg="var(--background-secondary)">
                    <ModalHeader color="white">Create new Task</ModalHeader>
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
                                    description: "test",
                                    colId: column!.id,
                                    userId: me.data.userId
                                });

                                onClose && onClose();
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <FormInput
                                        isInvalid={!!errors.name && touched.name}
                                        name="name" type="text" placeholder="name"
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
    );
}

export default CreateTaskModal;