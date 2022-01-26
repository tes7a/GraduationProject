import React, {useEffect} from 'react';
import {Header} from '../components/header/Header';
import {NavigationApp} from './NavigationApp';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {profileInfoTC} from "../api/AuthReducer";
import classes from "./App.module.css";


export function App() {
    const dispatch = useDispatch();
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    useEffect(() => {
        dispatch(profileInfoTC());
    }, [])

    if (!isInitialized) {
        return <h1>
            ...loading
        </h1>
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


