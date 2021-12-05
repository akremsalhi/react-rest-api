import React from 'react'

import { Input, InputGroup, InputLeftElement, InputProps, InputRightElement } from "@chakra-ui/input";

import { useFormFetch } from '../../../shared/context/FormContext';
import { SearchIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';

const SearchInput: React.FC<InputProps> = ({
    className = 'bg-white',
    ...props
}) => {
    const form = useFormFetch()
    return (
        <InputGroup {...props} className={className}>
            <InputLeftElement pointerEvents="none" children={ <SearchIcon fontSize={12} /> } />
            <Input
                onChange={(e) => {
                    const target = ((e.target) as HTMLInputElement)
                    setTimeout(() => form.params.onParamsChange(target.name, target.value), 800)
                }}
                autoComplete="off"
                readOnly={form.response.loading}
                {...props}
            />
            {form.response.loading && <InputRightElement pointerEvents="none" children={ <Spinner size="sm" /> } />}
        </InputGroup>
    )
}

export default SearchInput