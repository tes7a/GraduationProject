import { Dispatch } from "redux";
import {authAPI, LoginUserInfo} from "../../api/authAPI";
import a from "./ava.jpg"

// export const SomeUser: LoginUserInfo = {
//     _id: "0",
//     email: "fake",
//     name: "fake",
//     avatar: a,
//     publicCardPacksCount: 0,
//     deviceTokens: [],
//     tokenDeathTime: 42000,
//     token: '',
//     created: new Date().toJSON(),
//     updated: new Date().toJSON(),
//     isAdmin: false,
//     verified: false,
//     rememberMe: false,
//     __v: 1
// };

type initialStateType = {
    isLoggedIn: boolean
    user: LoginUserInfo
    error: string
}

const initialStateProfile: initialStateType = {
    isLoggedIn: false,
    error: '',
    user: {} as LoginUserInfo
}

export const ProfileReducer = (state = initialStateProfile, action: ActionsTypeReducer): initialStateType => {
    switch (action.type) {
        case "profile/TAKE-PROFILE-INFO":
            return {...state, user: action.data}
        case "profile/IS-LOGGED-IN":
            return {...state, isLoggedIn: action.status}
        case "auth/LOGIN":
            return {...state, user: {...action.user}};
        case "auth/SET-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn};
        case "auth/LOGOUT":
            return {...state, user: {} as LoginUserInfo};
        case "auth/SET-ERROR":
            return {...state, error: action.error};
        default:
            return state
    }
}

// action
const loginAC = (user: LoginUserInfo) => ({type: 'auth/LOGIN', user} as const);
const logoutAC = () => ({type: 'auth/LOGOUT'} as const);
const setLoggedInAC = (isLoggedIn: boolean) => ({type: 'auth/SET-LOGGED-IN', isLoggedIn} as const);
export const setLoginErrorAC = (error: string) => ({type: 'auth/SET-ERROR', error} as const);
const takeProfileInfo = (data: LoginUserInfo) => ({type: 'profile/TAKE-PROFILE-INFO', data} as const);
const isLoggedIn = (status: boolean) => ({type: 'profile/IS-LOGGED-IN', status} as const)

// thunk

export const ProfileInfo = () => (dispatch: Dispatch) => {
    authAPI.checkUserInfo()
        .then(res => {
            dispatch(isLoggedIn(true));
            dispatch(takeProfileInfo(res.data));
        })
        .catch(e => {
            console.log(e.response.data.emailRegExp)
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setLoginErrorAC(error));
        })
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            dispatch(loginAC(res.data));
            dispatch(setLoggedInAC(true));
            dispatch(setLoginErrorAC(''));
        })
        .catch(e => {
            console.log(e.response.data.emailRegExp)
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setLoginErrorAC(error));
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            dispatch(logoutAC());
            dispatch(setLoggedInAC(false));
            dispatch(setLoginErrorAC(''));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setLoginErrorAC(e.response.data));
        })
}

// type
type ActionsTypeReducer =
    | ReturnType<typeof takeProfileInfo>
    | ReturnType<typeof isLoggedIn>
    | ReturnType<typeof loginAC>
    | ReturnType<typeof setLoggedInAC>
    | ReturnType<typeof setLoginErrorAC>
    | ReturnType<typeof logoutAC>;
