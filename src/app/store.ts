import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { AppReducer } from "./app-reducer";
import {ProfileReducer} from "../faetures/profile/profile-reducer";
import {RegReducer} from "../faetures/reg/reg-reducer";
import {LoginReducer} from "../faetures/login/login-reducer";
import { newPasswordReducer } from "../faetures/newPassword/new-password-reducer";
import {forgotPasswordReducer} from "../faetures/forgotPassword/forgot-password-reducer";

const rootReducer = combineReducers({
    app: AppReducer,
    profile: ProfileReducer,
    reg: RegReducer,
    login: LoginReducer,
    newPassword: newPasswordReducer,
    forgotPassword: forgotPasswordReducer,
});


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;