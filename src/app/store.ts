import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { AppReducer } from "./app-reducer";
import {RegReducer} from "../faetures/reg/reg-reducer";
import { newPasswordReducer } from "../faetures/newPassword/new-password-reducer";
import {forgotPasswordReducer} from "../faetures/forgotPassword/forgot-password-reducer";
import {AuthReducer} from "../api/AuthReducer";
import {PacksReducer} from "../faetures/cards/PacksReducer";

const rootReducer = combineReducers({
    app: AppReducer,
    reg: RegReducer,
    auth: AuthReducer,
    newPassword: newPasswordReducer,
    forgotPassword: forgotPasswordReducer,
    packs:PacksReducer
});


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;