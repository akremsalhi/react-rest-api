import { Spinner } from "@chakra-ui/spinner";
import { useEffect } from "react";
import { useFormFetch } from "../../../shared/context/FormContext";
import Alert from "../../../UI/Components/Alert";

interface FetchProps {
    children: any
    reload: boolean
    fallback?: string | JSX.Element | null
}

export default function Fetch ({
    children,
    fallback = null,
    reload = false,
}: FetchProps): JSX.Element {
    const { response, search } = useFormFetch()
    
    useEffect(() => {
        response.get()
    }, [reload])

    if (response.offline) {
        
        return <Alert message="Check your network connectivity" status="warning" />
    }
    
    if (response.error) {
        return <Alert message={response.error} status="error" />
    }

    if (search.q !== '' && response.loading && !!response.data) {
        return (
            <div className="relative">
                { children(response.data, response.loading) }
                <div className="absolute top-1/2 right-1/2">
                    <Spinner size="xl" />
                </div>
            </div>
        )
    }

    if (response.loading && fallback) {
        if (typeof fallback === 'object') {
            return fallback
        } else {
            return <>{ fallback }</>
        }
    }

    if (Array.isArray(response.data) && (response.data as any[]).length === 0) {
        return <Alert message="No Data found" status="info" />
    }

    return children(response.data, response.loading)

}