import axios from "axios"

//const DEV_VERSION = false;
//! DEV_VERSION ? "http://localhost:7542/2.0/" : "https://neko-back.herokuapp.com/2.0/";
export const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
    }
)

// dal
export const authAPI = {
    checkUserInfo(date: CheckUserInfoType){
        return instance.post(`auth/me`, date)
    }
}

//type
export type CheckUserInfoType = {
    name: string,
    avatar: string,
}