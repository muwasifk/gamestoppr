import * as api from "../api/index";

export const getBlockStatus = () => async(dispatch) => {
    try{
        const { data } = await api.getblockstatus();

        return data;
    }   
    catch (error){
        console.log(error);
    }
}

export const toggleBlock = (toggle) => async(dispatch) => {
    try{
        const { data } = await api.toggleblock(toggle);

        return data;
    }
    catch (error){
        console.log(error);
    }
}

export const getMoney = () => async(dispatch) => {
    try{
        const { data } = await api.getmoney();

        console.log(data);

        return data;
    }
    catch(error){
        console.log(error);
    }
}

export const getPastBlocked = () =>  async(dispatch) => {
    try{
        const { data } = await api.getpastblocked();

        return data
    }
    catch(error){
        console.log(error);
    }
}