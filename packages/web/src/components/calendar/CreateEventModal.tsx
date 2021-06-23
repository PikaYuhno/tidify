import { UseDisclosureProps } from "@chakra-ui/hooks";
import { Modal } from "@chakra-ui/modal";
import {
    Button,
    FormControl,
    FormLabel,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@chakra-ui/react";
import { EventAttributes } from "@tidify/common";
import { Formik, Form } from "formik";
import moment from "moment";
import React from "react";
import { useQueryClient, useMutation } from "react-query";
import { createEvent } from "../../api/event";
import { Response } from "../../types";
import FormInput from "../auth/FormInput";
import DatePicker from "../../ui/DatePicker";

interface Props {
    disclosure: UseDisclosureProps;
    currentDate: Date;
}

const CreateEventModal: React.FC<Props> = ({
    disclosure: { onClose, isOpen },
    currentDate,
}) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(createEvent, {
        onMutate: (data: Omit<EventAttributes, "id">) => {
            queryClient.cancelQueries("events");

            const snapshot =
                queryClient.getQueryData<Response<EventAttributes[]>>("events");

            snapshot &&
                queryClient.setQueryData<Response<EventAttributes[]>>(
                    "events",
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
                queryClient.setQueryData<Response<EventAttributes[]>>(
                    "events",
                    context.snapshot
                );
            }
        },
        onSettled: () => queryClient.invalidateQueries("events"),
    });
    return (
        <>
            <Modal isOpen={isOpen!} onClose={onClose!} isCentered>
                <ModalOverlay />
                <ModalContent bg="var(--background-secondary)">
                    <ModalHeader color="white">Create new Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody paddingBottom="24px">
                        <Formik
                            initialValues={{
                                title: "",
                                start: currentDate?.toString() || "",
                                end: "",
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true);
                                console.log("values", values);
                                mutation.mutate({
                                    title: values.title,
                                    start: currentDate,
                                    end: moment(values.end).toDate(),
                                    guildId: 1,
                                });

                                onClose && onClose();
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, errors, touched, setFieldValue, values }) => (
                                <Form>
                                    <VStack spacing={5}>
                                        <FormInput
                                            isInvalid={!!errors.title && touched.title}
                                            name="title"
                                            type="text"
                                            placeholder="title"
                                            errorMessage={errors.title}
                                            label="Title"
                                        />

                                        <FormControl>
                                            <FormLabel color="white">Start date</FormLabel>
                                            <DatePickerField
                                                name="start"
                                                onChangeFunc={setFieldValue}
                                                value={values.start}
                                            />
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel color="white">End date</FormLabel>
                                            <DatePickerField
                                                name="end"
                                                onChangeFunc={setFieldValue}
                                                value={values.end}
                                            />
                                        </FormControl>
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
                                    </VStack>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
type DatePickerFieldProps = {
    name: string;
    value: string;
    onChangeFunc: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void;
};
const DatePickerField: React.FC<DatePickerFieldProps> = ({
    name,
    value,
    onChangeFunc,
}) => {
    return (
        <DatePicker
            selected={(value && new Date(value)) || null}
            onChange={(val) => {
                onChangeFunc(name, val);
            }}
        />
    );
};

export default CreateEventModal;

