import React from 'react'

import { Input, InputGroup, InputLeftElement, InputProps, InputRightElement } from "@chakra-ui/input";

import { useFormFetch } from '../../../shared/context/FormContext';
import { SearchIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';

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
            <Input
                onChange={(e) => setTimeout(() => form.search.onSearchChange(((e.target) as HTMLInputElement).value), 800)}
                autoComplete="off"
                readOnly={form.response.loading}
                {...props}
            />
            {form.response.loading && <InputRightElement pointerEvents="none" children={ <Spinner size="sm" /> } />}
        </InputGroup>
    )
}

export default SearchInput