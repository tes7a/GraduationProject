import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import classes from "./App.module.css";
import {setInitialized} from "./app-reducer";
import { PacksContainer } from '../faetures/packs/PacksContainer';
import { CardsContainer } from '../faetures/cards/CardsContainer';
import { ProfileContainer } from '../faetures/profile/ProfileContainer';
import {Registration} from '../faetures/reg/Registration';
import { LoginContainer } from '../faetures/login/LoginContainer';
import { NewPassword } from '../faetures/newPassword/NewPassword';
import { ForgotPassword } from '../faetures/forgotPassword/ForgotPassword';
import {Route, Routes } from 'react-router-dom';
import {HeaderContainer} from "../components/header/HeaderContainer";


export function App() {
    const dispatch = useDispatch();
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    useEffect(() => {
        dispatch(setInitialized(true));
    }, [])

    if (!isInitialized) {
        return <div className={classes.app}></div>
    }
    return (
        <div className={classes.app}>
            <HeaderContainer/>
            <main className={classes.main}>
            <Routes>
                <Route path={'/packs'} element={<PacksContainer/>}/>
                <Route path={'/cards/:id'} element={<CardsContainer/>}/>
                <Route path={'/'} element={<ProfileContainer/>}/>
                <Route path={'/login'} element={<LoginContainer/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
                <Route path={'/create-new-password'} element={<NewPassword/>}/>
            </Routes>
            </main>
        </div>
    );
}


