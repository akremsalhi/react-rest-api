import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ApiError, jsonFetch } from "../../utils/http/api";

const initialReasponse: { loading: boolean, offline: boolean, data:any, error: string|null } = {
    
    loading: true,
    offline: false,
    data: null,
    error: null
}

const FormFetchContext = createContext({
        params: { q: '', onParamsChange: (_name: string, _v: string) => {} },
        response: {
            fetch: () => {},
            ...initialReasponse
        },
    })

export const useFormFetch = () => {
    return useContext(FormFetchContext)
}

export function Fetch ({ children, endpoint }: any) {

    const [queryParams, setQueryParams] = useState<any>(undefined)
    const [response, setResponse] = useState(initialReasponse)
    const ref = useRef(() => {})

    const onParamsChange = (name: string, value: string) => {
        if (undefined === queryParams) {
            setQueryParams({ [name]: value })
        } else {
            setQueryParams((params: any) => ({ ...params, [name]: value }))
        }
    }

    ref.current = async () => {
        try {
            if (!window.navigator.onLine)
            return setResponse((r:any) => ({ ...r, offline: true, loading: false }))

            setResponse((r: any) => ({ ...r, loading: true }))
            const data = await jsonFetch(endpoint, { queryParams })
            setResponse({ loading: false, offline: false, error: null, data  })
        } catch (e: any) {
            if (e instanceof ApiError) {
                const error = e.body?.message || `${e.response?.status} Server error`
                setResponse((r) => ({
                    ...r,
                    loading: false,
                    offline: false,
                    data: null,
                    error
                }))
            } else {
                console.error(e)
                throw e
            }
        }
    }

    useEffect(() => {
        ref.current()
    }, [queryParams?.q])

    const value = {
        params: { q: '', onParamsChange },
        response: {
            fetch: ref.current,
            ...response
        }
    }

    return (
        <FormFetchContext.Provider value={ value }>
            { children }
        </FormFetchContext.Provider>
    )
}