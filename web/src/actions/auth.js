import * as api from "../api/index";
import {LOGIN, LOGOUT} from "../constants/actionTypes";

export const login = (inputs) => async(dispatch) => {
    try{
        const { data } = await api.login(inputs);

        console.log(data);

        dispatch({ type: LOGIN, data })

        return "success";
    }
    catch(error){
        console.log(error);
    }
}

export const logout = () => async(dispatch) => {
    try{
        await api.logout();

        dispatch({type: LOGOUT});
    }
    catch(error){
        console.log(error);
    }
}

export const register = (inputs) => async(dispatch) => {
    try{
        await api.register(inputs);

        return dispatch(login(inputs));
    }
    catch(error){
        console.log(error);
    }
}