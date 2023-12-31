import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')){
        req.headers.Authorization = `Token ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const login = (inputs) => API.post('auth/login/', inputs);
export const logout = () => API.post('auth/logout/', null);
export const register = (inputs) => API.post('auth/register/', inputs);

export const getblockstatus = () => API.get('block/', null);
export const toggleblock = (toggle) => API.put('block/', {blocked: toggle});

export const getmoney = () => API.get('block/money/', null);
export const getpastblocked = () => API.get('block/block-events/?limit=10', null);