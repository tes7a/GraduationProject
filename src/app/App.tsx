import React, {useEffect} from 'react';
import {Header} from '../components/header/Header';
import {NavigationApp} from './NavigationApp';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {profileInfoTC} from "../api/AuthReducer";
import classes from "./App.module.css";
import {Spin} from "antd";
import {RequestStatusType, setInitialized} from "./app-reducer";


export function App() {
    const dispatch = useDispatch();
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    useEffect(() => {
        dispatch(setInitialized(true));
    }, [])

    if (!isInitialized) {
        return <div className={classes.app}></div>
    }
    return (
        <div className={classes.app}>
            <Header/>
            <main className={classes.main}>
                <NavigationApp/>
            </main>
        </div>
    );
}


