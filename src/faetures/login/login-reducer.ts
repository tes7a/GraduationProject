import {Dispatch} from "redux";
import {authAPI, LoginUserInfo} from "../../api/authAPI";

const initialLoginState: LoginReducerStateType = {
    user: {} as LoginUserInfo,
    isLoggedIn: false,
    error: ''
};

export const LoginReducer = (state: LoginReducerStateType = initialLoginState, action: ActionsTypeReducer): LoginReducerStateType => {
    switch (action.type) {
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

//action
const loginAC = (user: LoginUserInfo) => ({type: 'auth/LOGIN', user} as const);
const logoutAC = () => ({type: 'auth/LOGOUT'} as const);
const setLoggedInAC = (isLoggedIn: boolean) => ({type: 'auth/SET-LOGGED-IN', isLoggedIn} as const);
export const setLoginErrorAC = (error: string) => ({type: 'auth/SET-ERROR', error} as const);

//thunk
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
//type
export type LoginReducerStateType = {
    user: LoginUserInfo
    isLoggedIn: boolean
    error: string
}

type ActionsTypeReducer = ReturnType<typeof loginAC>
    | ReturnType<typeof setLoggedInAC>
    | ReturnType<typeof setLoginErrorAC>
    | ReturnType<typeof logoutAC>;
