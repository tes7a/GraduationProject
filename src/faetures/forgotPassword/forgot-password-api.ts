import axios from "axios";
import {DataRecoveryPasswordType} from "./forgot-password-reducer";


const instance2 = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    // baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
});

export const forgotPasswordAPI = {
    createForgotPasswordRequest(data: DataRecoveryPasswordType){
        return instance2.post("auth/forgot", data);
    }
};