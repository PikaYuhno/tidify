import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
type Props = {} & ButtonProps;

const Button: React.FC<Props> = (props) => {
    return (
        <ChakraButton
            bg="var(--background-secondary)"
            color="white"
            sx={{
                "&:hover": {
                    color: 'var(--background-secondary)'
                }
            }}
            _focus={{
                boxShadow:
                    "0 0 1px 2px var(--background-primary), 0 1px 1px var(--background-primary)",
            }}
            {...props}
        >

        </ChakraButton>
    );
}

export default Button;