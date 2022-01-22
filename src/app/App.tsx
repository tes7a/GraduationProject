import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header} from '../components/header/Header';
import './App.css';
import {NavigationApp} from './NavigationApp';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {profileInfoTC} from "../api/AuthReducer";


export function App() {
    const dispatch = useDispatch();
    const isInitialized = useSelector<AppRootStateType,boolean>(state => state.app.isInitialized);
    useEffect(()=>{
        dispatch(profileInfoTC());
    },[])

    if(!isInitialized){
        return <h1>
            ...loading
        </h1>
    }
    return (
        <div>
            <Header/>
            <NavigationApp/>
        </div>
    );
}


