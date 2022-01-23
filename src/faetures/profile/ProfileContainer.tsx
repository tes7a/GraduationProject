import React from "react";
import {useDispatch, useSelector } from "react-redux";
import {LoginUserInfo } from "../../api/authAPI";
import { AppRootStateType } from "../../app/store";
import { Navigate } from 'react-router-dom';
import a from "./ava.jpg"
import s from './profile.module.css'
import { PATH } from "../../routes/routes";
import { useEffect } from "react";
import { Profile } from "./Profile";
import { logoutTC, profileInfoTC } from "../../api/AuthReducer";


export const ProfileContainer = () => {
    const user = useSelector<AppRootStateType,LoginUserInfo | null>(state => state.auth.user);
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn);
    const error: string = useSelector<AppRootStateType, string>(state => state.auth.error);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutTC());
    }

    useEffect(() => {
        dispatch(profileInfoTC())
    },[dispatch])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    if(user != null ){
        return <div className={s.wrapper}>
            <Profile user={user}/>
            <div className={s.logOut}>
                <span>Пользователь авторизован!</span>
                <button onClick={logout} className={s.btnLogOut}>Log Out
                </button>
            </div>
        </div>
    } else {
        return <div>{error}</div>
    }
}
