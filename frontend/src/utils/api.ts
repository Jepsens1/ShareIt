import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/"
})

export async function post(url: string, data = {}, headers = {}) {
    return await api.post(url, data, {headers: headers});
}
export async function get (url: string, headers = {}) {
    return await api.get(url, {headers: headers});
}