import React, { useState } from "react";
import { ApiError, jsonFetch } from "../../utils/http/api";
// import { FormContext } from "../context/FormContext";

interface FetchFormProps {
    method?: string | undefined
    children: React.ReactNode
    action: string
    onSuccess?: Function
}

export default function FetchForm ({
  children,
  action,
  onSuccess = () => {},
  method = 'POST'
}: FetchFormProps) {
    
  const [{ loading, errors }, setState] = useState<{ loading: boolean, errors: any }>({
    loading: false,
    errors: {}
  })

  const emptyError = (name: string) => {
    if (!errors[name]) return null
    const newErrors = { ...errors }
    delete newErrors[name]
    setState(s => ({ ...s, errors: newErrors }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setState({ loading: true, errors: [] })
    const form = e.target
    const formData = { ...{}, ...Object.fromEntries(new FormData(form)) }
    try {
      const response = await jsonFetch(action, { method, body: formData })
      onSuccess(response)
      form.reset()
    } catch (e: any) {
      if (e instanceof ApiError) {
        setState(s => ({ ...s, errors: e.responseBody }))
      } else {
        throw e
      }
    }
    setState(s => ({ ...s, loading: false }))
  }

    return (
        // <FormContext.Provider value={{ loading, errors, emptyError }}>
          <form onSubmit={handleSubmit}>
            { children }
          </form>
        // </FormContext.Provider>
    )
}