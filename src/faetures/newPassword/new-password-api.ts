import axios from "axios";
import {DataNewPasswordType} from "./newPasswordReducer";


const instance = axios.create({
    // baseURL: "https://neko-back.herokuapp.com/2.0"
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
});

export const newPasswordAPI = {
    createRequestRecoveryPassword(data: DataNewPasswordType){
        return instance.post("auth/set-new-password", data);
    }
};