import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ApiError, jsonFetch } from "../../utils/http/api";

const initialReasponse: { loading: boolean, offline: boolean, data:any, error: string|null } = {
    
    loading: true,
    offline: false,
    data: null,
    error: null
}

const FormFetchContext = createContext({
        search: { q: '', onSearchChange: (_v: string) => {} },
        response: {
            get: () => {},
            ...initialReasponse
        },
    })

export const useFormFetch = () => {
    return useContext(FormFetchContext)
}

export function FormFetch ({ children, action }: any) {

    const [q, setSearch] = useState('')
    const [response, setResponse] = useState(initialReasponse)
    const ref = useRef(() => {})

    const onSearchChange = (v: string) => {
        setSearch(v)
    }

    ref.current = async () => {
        try {
            if (!window.navigator.onLine) {
                setResponse((r:any) => ({ ...r, offline: true }))
                return
            }
            setResponse((r: any) => ({ ...r, loading: true }))
            const queryParams = q !== '' ? { q } : undefined
            const params = { queryParams }

            const data = await jsonFetch(action, params)
            setResponse({ loading: false, offline: false, error: null, data  })
        } catch (e: any) {
            if (e instanceof ApiError) {
                setResponse((r) => ({ ...r, loading: false, offline: false, data: null, error: e.body?.message ?? `${e.response?.status} Server error` }))
            } else {
                console.error(e)
                throw e
            }
        }
    }

    useEffect(() => {
        ref.current()
    }, [q])

    const value = {
        search: { q, onSearchChange },
        response: {
            get: ref.current,
            ...response
        }
    }

    return (
        <FormFetchContext.Provider value={ value }>
            { children }
        </FormFetchContext.Provider>
    )
}