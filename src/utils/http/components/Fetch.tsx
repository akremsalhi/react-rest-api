import { Spinner } from "@chakra-ui/spinner";
import { useEffect } from "react";
import { useFormFetch } from "../../../shared/context/FormContext";
import Alert from "../../../UI/Components/Alert";

interface FetchProps {
    children: any
    reload: boolean
    fallback: JSX.Element
}

export default function Fetch({
    children,
    fallback,
    reload = false,
}: FetchProps): JSX.Element {
    const { response, search } = useFormFetch()

    // simulate reloading data
    useEffect(() => {
        response.get()
        // eslint-disable-next-line
    }, [reload])

    // if  no internet connexion
    if (response.offline) return <Alert message="Check your network connectivity" status="warning" />

    // if response has an error
    if (response.error) return <Alert message={response.error} status="error" />

    // Show loading spinner on search
    if (search.q !== '' && response.loading && !!response.data) {
        return <div className="relative">
            {children(response.data, response.loading)}
            <div className="absolute top-1/2 right-1/2">
                <Spinner size="xl" />
            </div>
        </div>
    }

    // Show Users skeleton on first render of component
    if (response.loading && fallback) return fallback

    // show message if no data foud in the search
    if (Array.isArray(response.data) && (response.data as any[]).length === 0) {
        return <Alert message="No Data found" status="info" />
    }

    // succeed and showing the results
    return children(response.data)

}