import { useState } from 'react';

import { Button } from '@chakra-ui/button'
import { RepeatClockIcon } from '@chakra-ui/icons'
import Users from './Users';
import UsersSkeleton from './UsersSkeleton';
import Fetch from './utils/http/components/Fetch';
import FormSearchInput from './UI/Components/Forms/FormSearchInput';
import { FormFetch } from './shared/context/FormContext';


export default function FetchingData() {
    const [reload, setReload] = useState(false)
    const [reloadError, setReloadReload] = useState(false)

    const updateState = () => {
        setReload(r => !r)
    }
    const updateWithError = () => {
        setReloadReload(r => !r)
    }

    const url = reloadError ? `https://jsonplaceholder.typicode.com/user` : `https://jsonplaceholder.typicode.com/users`

    return (
        <div className="grid grid-cols-1 gap-y-2">
            <div className="grid grid-cols-2 justify-between items-center">
                <h1 className="text-2xl">Fetching data</h1>
                <div className="grid grid-cols-2 justify-between items-center gap-x-2">
                    <Button rightIcon={<RepeatClockIcon />} onClick={() => updateState()}>
                        Reload data
                    </Button>
                    <Button colorScheme={reloadError ? 'green' : 'red'} onClick={() => updateWithError()}>
                        Try with {reloadError ? 'Success' : 'Error'}
                    </Button>
                </div>
            </div>

            <FormFetch url={url}>
                <FormSearchInput name="q" id="q" className="bg-white" placeholder="Search" autoFocus></FormSearchInput>
                <Fetch fallback={<UsersSkeleton count={10} />} reload={reload}>
                    {(users: any[]) =>  <Users users={users} />}
                </Fetch>
            </FormFetch>


        </div>
    )
}