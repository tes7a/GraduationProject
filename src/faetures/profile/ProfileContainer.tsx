import React from "react";
import {useDispatch, useSelector } from "react-redux";
import {LoginUserInfo } from "../../api/authAPI";
import { AppRootStateType } from "../../app/store";
import { Navigate } from 'react-router-dom';
import a from "./ava.jpg"
import s from './profile.module.css'
import { PATH } from "../../routes/routes";
import { useEffect } from "react";
import { ProfileInfo } from "./profile-reducer";
import { Profile } from "./Profile";
import { logoutTC } from "../login/login-reducer";

export const ProfileContainer = () => {
    const user = useSelector<AppRootStateType,LoginUserInfo | null>(state => state.profile.user);
    const isLoggedIn = useSelector<AppRootStateType>(state => state.profile.isLoggedIn);
    const error: string = useSelector<AppRootStateType, string>(state => state.login.error);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutTC());
    }

    useEffect(() => {
        dispatch(ProfileInfo())
    },[dispatch])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    if(user != null ){
        return <div>
            <Profile user={user}/>
            <span>Пользователь авторизован!</span>
            <button onClick={logout}>LogOut
            </button>
        </div>
    }else {
        return <div>{error}</div>
    }
}
