import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useRef } from "react";
import { useFormFetch } from "../../../shared/context/FormContext";
import Alert from "../../../UI/Components/Alert";

interface AwaitProps {
    children: any
    reload: boolean
    fallback: JSX.Element
}

export default function Await({
    children,
    fallback,
    reload = false,
}: AwaitProps): JSX.Element {
    const { response, params } = useFormFetch()

    const ref = useRef(() => {})

    ref.current = response.fetch 
    // simulate reloading data
    useEffect(() => {
        ref.current()
    }, [reload])

    // if  no internet connexion
    if (response.offline) return <Alert message="Check your network connectivity" status="warning" />

    // if response has an error
    if (response.error) return <Alert message={response.error} status="error" />

    // Show skeleton loader
    if (response.loading) return fallback

    // show message if no data foud in the search
    if (Array.isArray(response.data) && (response.data as any[]).length === 0) return <Alert message="No Data found" status="info" />

    // show response results
    return <div className="relative">
        {children(response.data, response.loading)}
        
        {/* if searching */}
        { params.q !== '' && response.loading && 
            <div className="absolute top-1/2 right-1/2">
                <Spinner size="xl" />
            </div>
        }
    </div>

}