import React from 'react'

import { FormControl, FormControlProps, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputProps } from "@chakra-ui/input";

const FormInput: React.FC<InputProps & FormControlProps & { helperText?: string, leftIcon?: any, rightIcon?: any, onChange?: Function|undefined }> = ({
    id,
    helperText,
    leftIcon,
    rightIcon,
    children,
    onChange = () => {},
    ...props
}) => {
    return (
        <FormControl id={id} {...props}>
            <FormLabel>{ children }</FormLabel>
            <InputGroup>
                { leftIcon && <InputLeftElement pointerEvents="none" children={ leftIcon } /> }
                <Input {...props} onChange={(e) => onChange(e)}/>
                {/* <InputRightElement
                pointerEvents="none"
                children={<CloseIcon fontSize={12} color="red.600" />}
                /> */}

            </InputGroup>
            { helperText && <FormHelperText>{ helperText }</FormHelperText> }
            <FormErrorMessage>Error message</FormErrorMessage> 
        </FormControl>
    )
}

export default FormInput