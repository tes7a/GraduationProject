import axios from "axios";
import { DataRecoveryPasswordType } from "./password-recovery-reducer";

const instance = axios.create({
    // baseURL: "https://neko-back.herokuapp.com/2.0"
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
});

export const recoveryPasswordAPI = {
    createRequestRecoveryPassword(data: DataRecoveryPasswordType){
        return instance.post("auth/forgot", data);
    }
};