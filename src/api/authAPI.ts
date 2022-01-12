import axios, { AxiosResponse } from "axios"

//const DEV_VERSION = false;
//! DEV_VERSION ? "http://localhost:7542/2.0/" : "https://neko-back.herokuapp.com/2.0/";
export const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
    }
)

// dal
export const authAPI = {
    checkUserInfo(){
        return instance.post<{},AxiosResponse<UserDataInfo>>(`auth/me`,{})
    }
}

//type
export type UserDataInfo = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
}

