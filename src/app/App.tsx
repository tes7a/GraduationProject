import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header} from '../components/header/Header';
import './App.css';
import {NavigationApp} from './NavigationApp';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {profileInfoTC} from "../api/AuthReducer";
import { PacksContainer } from '../faetures/packs/PacksContainer';
import { CardsContainer } from '../faetures/cards/CardsContainer';
import { ProfileContainer } from '../faetures/profile/ProfileContainer';
import {Registration} from '../faetures/reg/Registration';
import { LoginContainer } from '../faetures/login/LoginContainer';
import { NewPassword } from '../faetures/newPassword/NewPassword';
import { ForgotPassword } from '../faetures/forgotPassword/ForgotPassword';


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
            <Routes>
                <Route path={'/packs'} element={<PacksContainer/>}/>
                <Route path={'/cards/:id'} element={<CardsContainer/>}/>
                <Route path={'/'} element={<ProfileContainer/>}/>
                <Route path={'/login'} element={<LoginContainer/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
                <Route path={'/create-new-password'} element={<NewPassword/>}/>
            </Routes>
        </div>
    );
}


