
export async function jsonFetch (url: string, params: any = {}) {

    if (params.body && typeof params.body === 'object') {
        params.body = JSON.stringify(params.body)
    }

    if (params.queryParams && typeof params.queryParams === 'object') {
        const queryString = (new URLSearchParams(params.queryParams)).toString()
        url += `?${queryString}`
        console.log(url)
    }

    params = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        ...params
    }

    const response = await fetch(url, params)

    if (response.status === 204) {
        return null
    }

    const body = await response.json()

    if (response.ok) {
        return body
    }

    throw new ApiError(response, body)


}


export class ApiError {

    public response
    public body

    constructor (response: any, body: any) {
        this.response = response
        this.body = body
    }

    get responseBody () {
        return this.body
    }

    get message () {
        return this.body.message || null
    }

    get errors () {
        return this.body.errors || {}
    }

    get status () {
        return this.response.status
    }

}