import {Dispatch} from "redux";
import {authAPI, UserAuthInfo} from "../../api/authAPI";

const initialLoginState: LoginReducerStateType = {} as LoginReducerStateType;

export const LoginReducer = (state: LoginReducerStateType = initialLoginState, action: ActionsTypeReducer): LoginReducerStateType => {
    switch (action.type) {
        case "AUTHORIZED":
            return {...state, user: {...action.user}}
        default:
            return state
    }
}

//action
const authorizedAC = (user: UserAuthInfo) => ({type: 'AUTHORIZED', user})

//thunk
export const authorizedTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.authorized(email, password, rememberMe)
        .then(res => {
            dispatch(authorizedAC(res.data))
        })
        .catch(e => {
            console.log(e);
        })
}
//type
type LoginReducerStateType = {
    user: UserAuthInfo
}

type ActionsTypeReducer = ReturnType<typeof authorizedAC>;
