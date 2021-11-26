import { Alert as ChakraUIAlert, AlertIcon } from '@chakra-ui/alert';

interface AlertProps {
    status?: 'success' | 'error' | 'info' | 'warning'
    variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent'
    message: string
}

export default function Alert({ message, status = 'info', variant = 'top-accent' }: AlertProps): JSX.Element {
    return <ChakraUIAlert status={status} variant={variant}>
        <AlertIcon />
        {message}
    </ChakraUIAlert>
}
