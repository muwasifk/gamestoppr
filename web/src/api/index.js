import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')){
        req.headers.Authorization = `Token ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const login = (inputs) => API.post('/auth/login/', inputs);
export const logout = () => API.post('/auth/logout/', null);
export const register = (inputs) => API.post('/auth/register/', inputs);