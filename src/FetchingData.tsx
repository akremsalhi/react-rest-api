import { useState } from 'react';

import { Button } from '@chakra-ui/button'
import { RepeatClockIcon } from '@chakra-ui/icons'
import Users from './Users';
import UsersSkeleton from './UsersSkeleton';
import Fetch from './utils/http/components/Fetch';
import FormSearchInput from './UI/Components/Forms/FormSearchInput';
import { FormFetch } from './shared/context/FormContext';
import { List, ListIcon, ListItem } from '@chakra-ui/layout';
import { MdCheckCircle } from "react-icons/md"


export default function FetchingData() {
    const [reload, setReload] = useState(false)
    const [reloadError, setReloadReload] = useState(false)

    const updateState = () => {
        setReload(r => !r)
    }
    const updateWithError = () => {
        setReloadReload(r => !r)
    }

    const action = reloadError ? `/user` : `/users`

    return (
        <div className="grid grid-cols-1 gap-y-2">
            <div className="grid justify-between items-center lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 sm:gap-y-1">
                <h1 className="text-2xl">Example REST API usage with <strong>React</strong></h1>

                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 sm:gap-y-2 xs:grid-cols-1 xs:gap-y-2 justify-between items-center gap-x-2">

                    <Button rightIcon={<RepeatClockIcon />} onClick={() => updateState()}>
                        Reload data
                    </Button>
                    <Button colorScheme={reloadError ? 'green' : 'red'} onClick={() => updateWithError()}>
                        Try with {reloadError ? 'Success' : 'Error'}
                    </Button>
                </div>
                
            </div>

            <FormFetch action={action}>
                <FormSearchInput name="q" id="q" className="bg-white" placeholder="Search" autoFocus></FormSearchInput>
                <Fetch fallback={<UsersSkeleton count={10} />} reload={reload}>
                    {(users: any[]) =>  <Users users={users} />}
                </Fetch>
            </FormFetch>

            <div className="mt-10 grid grid-cols-1 gap-y-3">
                <strong>Important:</strong>
                <List spacing={3}>
                    <ListItem className="text-lg">
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Catching http errors.
                    </ListItem>
                    <ListItem className="text-lg">
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Show content as the request data is ready.
                    </ListItem>
                    <ListItem className="text-lg">
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        Make the Search input as readonly if the data is not ready.
                    </ListItem>
                </List>
            </div>


        </div>
    )
}