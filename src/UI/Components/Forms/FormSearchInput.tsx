import React from 'react'

import { Input, InputGroup, InputLeftElement, InputProps } from "@chakra-ui/input";

import { useFormFetch } from '../../../shared/context/FormContext';
import { SearchIcon } from '@chakra-ui/icons';

const SearchInput: React.FC<InputProps & { helperText?: string, onChange?: Function|undefined }> = ({
    id,
    helperText,
    children,
    onChange = () => {},
    ...props
}) => {
    const form = useFormFetch()
    return (
        <InputGroup {...props}>
            <InputLeftElement pointerEvents="none" children={ <SearchIcon fontSize={12} /> } />
            <Input {...props} onChange={(e) => setTimeout(() => form.search.onSearchChange(((e.target) as HTMLInputElement).value), 700)} autoComplete="off" />
        </InputGroup>
    )
}

export default SearchInput