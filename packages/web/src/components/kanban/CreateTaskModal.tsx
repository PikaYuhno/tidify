import { UseDisclosureProps, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button } from "@chakra-ui/react";
import { BoardAttributes } from "@tidify/common";
import { Formik, Form } from "formik";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createBoard } from "../../api/board";
import { Response } from "../../types";
import FormInput from "../auth/FormInput";

interface Props {
    disclosure: UseDisclosureProps;
};

const CreateTaskModal: React.FC<Props> = ({ disclosure: { isOpen, onClose } }) => {

    const queryClient = useQueryClient();

    const mutation = useMutation(createBoard, {
        onMutate: (data: Omit<BoardAttributes, "id">) => {
            queryClient.cancelQueries("tasks");

            const snapshot =
                queryClient.getQueryData<Response<BoardAttributes[]>>("tasks");

            snapshot &&
                queryClient.setQueryData<Response<BoardAttributes[]>>(
                    "tasks",
                    (prev) => ({
                        data: [
                            ...snapshot.data,
                            {
                                id: Math.random(),
                                ...data,
                            },
                        ],
                        message: prev!.message,
                        success: prev!.success,
                    })
                );

            return { snapshot };
        },
        onError: (_, __, context) => {
            if (context?.snapshot) {
                queryClient.setQueryData<Response<BoardAttributes[]>>(
                    "events",
                    context.snapshot
                );
            }
        },
        onSettled: () => queryClient.invalidateQueries("boards"),
    });
    return (
        <>
            <Modal isOpen={isOpen!} onClose={onClose!} isCentered >
                <ModalOverlay />
                <ModalContent bg="var(--background-secondary)">
                    <ModalHeader color="hite">Create tasks</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        paddingBottom="24px"
                    >
                        <Formik
                            initialValues={{ name: '' }}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true);
                                //mutation.mutate(values.name);

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