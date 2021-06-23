import { UseDisclosureProps, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { BoardAttributes } from "@tidify/common";
import { Formik, Form } from "formik";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createBoard } from "../../api/board";
import { useSelectedGuild } from "../../store/useSelectedGuild";
import { Response } from "../../types";
import FormInput from "../auth/FormInput";
import Button from '../../ui/Button';

interface Props {
    disclosure: UseDisclosureProps;
};

const CreateBoardModal: React.FC<Props> = ({disclosure: {isOpen, onClose}}) => {
    const selectedGuild = useSelectedGuild(state => state.selectedGuild);
    const queryClient = useQueryClient();

    const mutation = useMutation(createBoard, {
        onMutate: (data: Omit<BoardAttributes, "id">) => {
            queryClient.cancelQueries("boards");

            const snapshot =
                queryClient.getQueryData<Response<BoardAttributes[]>>("boards");

            snapshot &&
                queryClient.setQueryData<Response<BoardAttributes[]>>(
                    "boards",
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
                    <ModalHeader color="white">Create new Board</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        paddingBottom="24px"
                    >
                        <Formik
                            initialValues={{ title: '' }}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true);
                                mutation.mutate({title: values.title, guildId: selectedGuild!.id});

                                onClose && onClose();
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <FormInput
                                        isInvalid={!!errors.title && touched.title}
                                        name="title" type="text" placeholder="name"
                                        errorMessage={errors.title}
                                        label="Board name"
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

export default CreateBoardModal;