import {instance} from "./authAPI";

export const registerAPI = {
    register(data: RegisterRequestType) {
        return instance.post('auth/register', data)
    }
}

export type RegisterRequestType = {
    email: string
    password: string
}