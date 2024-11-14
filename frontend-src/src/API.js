export const BACKEND_URL = process.env.BACKEND_URL ?? 'http://127.0.0.1:8000'

export function apiCall(route, opts){
    return fetch(BACKEND_URL + route, opts)
}