import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/"
})

function getToken()
{
    const tokens = localStorage.getItem("social_media_tokens");
    if (!tokens) {
        return ""
    }
    return JSON.parse(tokens);
}

export async function post(url: string, data = {}, headers = {}, useAuth = true) {
    if(useAuth) {
        const tokens = getToken();
        headers["Authorization"] = "Bearer " + tokens.access_token;
    }
    return await api.post(url, data, {headers: headers});
}
export async function get (url: string, headers = {}) {
    return await api.get(url, {headers: headers});
}
export async function deleteRequest (url, headers = {}) {
    return await api.delete(url, {headers: headers});
}
