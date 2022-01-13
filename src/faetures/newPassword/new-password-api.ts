import axios from "axios";
import {DataNewPasswordType} from "./new-password-reducer";


const instance3 = axios.create({
    // baseURL: "https://neko-back.herokuapp.com/2.0"
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
});

export const newPasswordAPI = {
    createRequestRecoveryPassword(data: DataNewPasswordType){
        return instance3.post("auth/set-new-password", data);
    }
};