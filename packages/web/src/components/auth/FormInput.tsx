import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Field, FieldAttributes } from "formik";
import React from "react";

export type Props = {
    isInvalid: boolean | undefined;
    errorMessage: string | undefined;
    label: string;
} & {
        [P in keyof FieldAttributes<any>]: FieldAttributes<any>[P];
    };


const FormInput: React.FC<Props> = ({ isInvalid, errorMessage, label, children, ...rest }) => {
    const { type } = rest;
    const [show, setShow] = React.useState(false)

    return (
        <FormControl isInvalid={isInvalid}>
            <FormLabel color={"var(--text-primary)"}>{label}</FormLabel>
            <InputGroup size="md">
                <Field {...rest} as={Input} focusBorderColor="pink.400" type={type === "password" ? (show ? "text" : "password") : (type)} variant="filled" />
                {type && type === "password" && <>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </>}
            </InputGroup>
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
    );
}

export default FormInput;