
export async function jsonFetch (url: string, params: any = {}) {

    if (params.body && typeof params.body === 'object') {
        params.body = JSON.stringify(params.body)
    }

    if (params.queryParams && typeof params.queryParams === 'object') {
        url += `?${(new URLSearchParams(params.queryParams)).toString()}`
    }

    params = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        ...params
    }

    const response = await fetch(process.env.REACT_APP_API_URL + url, params)

    if (response.status === 204) {
        return null
    }

    const body = await response.json()

    if (response.ok) {
        return body
    }

    throw new ApiError(response, body)


}


export class ApiError extends Error {

    public response
    public body

    constructor (response: any, body: any) {
        super()
        this.response = response
        this.body = body
    }
}