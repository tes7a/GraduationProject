import {Dispatch} from "redux";
import {authAPI, LoginUserInfo} from './authAPI';
import {setInitialized, setStatusAppAC} from "../app/app-reducer";

type initialStateType = {
    isLoggedIn: boolean
    user: LoginUserInfo
    error: string,
}

const initialStateProfile: initialStateType = {
    isLoggedIn: false,
    error: '',
    user: {} as LoginUserInfo
}

export const AuthReducer = (state = initialStateProfile, action: AuthReducerActionsType): initialStateType => {
    switch (action.type) {
        case "profile/TAKE-PROFILE-INFO":
            return {...state, user: action.data}
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

// thunk

export const profileInfoTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    authAPI.checkUserInfo()
        .then(res => {
            dispatch(setLoggedInAC(true));
            dispatch(takeProfileInfo(res.data));
            dispatch(setLoginErrorAC(''));
            dispatch(setStatusAppAC('succeeded'));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setLoginErrorAC(error));
            dispatch(setStatusAppAC('failed'));
        })
        .finally(() => {
            dispatch(setInitialized(true));
            dispatch(setStatusAppAC('idle'));
        })
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    authAPI.login(email, password, rememberMe)
        .then(res => {
            dispatch(loginAC(res.data));
            dispatch(setLoggedInAC(true));
            dispatch(setLoginErrorAC(''));
            dispatch(setStatusAppAC('succeeded'));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setLoginErrorAC(error));
            dispatch(setStatusAppAC('failed'));
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'));
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    authAPI.logout()
        .then(res => {
            dispatch(logoutAC());
            dispatch(setLoggedInAC(false));
            dispatch(setLoginErrorAC(''));
            dispatch(setStatusAppAC('succeeded'));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setLoginErrorAC(e.response.data));
            dispatch(setStatusAppAC('failed'));
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'));
        })
}

// type
export type AuthReducerActionsType =
    | ReturnType<typeof takeProfileInfo>
    | ReturnType<typeof loginAC>
    | ReturnType<typeof setLoggedInAC>
    | ReturnType<typeof setLoginErrorAC>
    | ReturnType<typeof logoutAC>;
