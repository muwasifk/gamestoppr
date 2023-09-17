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