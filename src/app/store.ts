import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { AppReducer } from "./app-reducer";
import {RegReducer} from "../faetures/reg/reg-reducer";
import { newPasswordReducer } from "../faetures/newPassword/new-password-reducer";
import {forgotPasswordReducer} from "../faetures/forgotPassword/forgot-password-reducer";
import {AuthReducer} from "../api/AuthReducer";
import {CardsReducer} from "../faetures/cards/CardsReducer";

const rootReducer = combineReducers({
    app: AppReducer,
    reg: RegReducer,
    auth: AuthReducer,
    newPassword: newPasswordReducer,
    forgotPassword: forgotPasswordReducer,
    cards:CardsReducer
});


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;