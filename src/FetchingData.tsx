import { useState } from 'react';
import Actions from './Actions';
import Instructions from './Instructions';
import { Fetch } from './shared/context/FormContext';
import FormSearchInput from './UI/Components/Forms/FormSearchInput';
import Users from './Users';
import UsersSkeleton from './UsersSkeleton';
import Await from './utils/http/components/Await';



export default function FetchingData() {
    const [reload, setReload] = useState(false)
    const [reloadError, setReloadReload] = useState(false)

    const updateState = () => {
        setReload(r => !r)
    }
    const updateWithError = () => {
        setReloadReload(r => !r)
    }

    const endpoint = reloadError ? `/user` : `/users`

    return (
        <div className="grid gap-y-6">
            <Actions updateState={updateState} updateWithError={updateWithError} reloadError={reloadError} />
            
            <Fetch endpoint={endpoint}>
                <FormSearchInput name="q" id="q" placeholder="Search" autoFocus></FormSearchInput>
                <Await fallback={<UsersSkeleton count={10} />} reload={reload}>
                    {(users: any[]) =>  <Users users={users} />}
                </Await>
            </Fetch>

            <Instructions />
        </div>
    )
}