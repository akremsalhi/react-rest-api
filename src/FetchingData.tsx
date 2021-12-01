import { useState } from 'react';
import Actions from './Actions';
import Instructions from './Instructions';
import { FormFetch } from './shared/context/FormContext';
import FormSearchInput from './UI/Components/Forms/FormSearchInput';
import Users from './Users';
import UsersSkeleton from './UsersSkeleton';
import Fetch from './utils/http/components/Fetch';



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
        <div className="grid grid-cols-1 gap-y-6">
            <Actions updateState={updateState} updateWithError={updateWithError} reloadError={reloadError} />
            
            <FormFetch action={action}>
                <FormSearchInput name="q" id="q" className="bg-white" placeholder="Search" autoFocus></FormSearchInput>
                <Fetch fallback={<UsersSkeleton count={10} />} reload={reload}>
                    {(users: any[]) =>  <Users users={users} />}
                </Fetch>
            </FormFetch>

            <Instructions />
        </div>
    )
}