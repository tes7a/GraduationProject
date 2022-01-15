import {Dispatch} from "redux";
import {authAPI, LoginUserInfo} from "../../api/authAPI";

const initialLoginState: LoginReducerStateType = {
    user: {} as LoginUserInfo,
    isLoggedIn: false
};

export const LoginReducer = (state: LoginReducerStateType = initialLoginState, action: ActionsTypeReducer): LoginReducerStateType => {
    switch (action.type) {
        case "auth/LOGIN":
            return {...state, user: {...action.user}};
        case "auth/SET-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn};
        case "auth/LOGOUT":
            return {...state,user:{} as LoginUserInfo}
        default:
            return state
    }
}

//action
const loginAC = (user: LoginUserInfo) => ({type: 'auth/LOGIN', user} as const);
const logoutAC = () => ({type: 'auth/LOGOUT'} as const);
const setLoggedInAC = (isLoggedIn: boolean) => ({type: 'auth/SET-LOGGED-IN', isLoggedIn} as const);

//thunk
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            dispatch(loginAC(res.data));
            dispatch(setLoggedInAC(true));
            console.log(res.data)
        })
        .catch(e => {
            console.log(e);
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            dispatch(logoutAC());
            dispatch(setLoggedInAC(false));
            console.log(res);
        })
        .catch(e => {
            console.log(e);
        })
}
//type
export type LoginReducerStateType = {
    user: LoginUserInfo
    isLoggedIn: boolean
}

type ActionsTypeReducer = ReturnType<typeof loginAC>
    | ReturnType<typeof setLoggedInAC>
    | ReturnType<typeof logoutAC>;
