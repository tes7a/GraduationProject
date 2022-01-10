import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./app-reducer";
import {ProfileReducer} from "../faetures/profile-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    profile: ProfileReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;