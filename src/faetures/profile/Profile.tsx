import React from "react";
import {useDispatch, useSelector } from "react-redux";
import {UserAuthInfo, UserDataInfo } from "../../api/authAPI";
import { AppRootStateType } from "../../app/store";
import { Navigate } from 'react-router-dom';
import a from "./ava.jpg"
import s from './profile.module.css'
import { PATH } from "../../routes/routes";
import { useEffect } from "react";
import { ProfileInfo } from "./profile-reducer";

export const Profile = () => {
    const user = useSelector<AppRootStateType,UserAuthInfo | null>(state => state.profile.user);
    const isLoggedIn = useSelector<AppRootStateType>(state => state.profile.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ProfileInfo())
    },[])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>
    if(user != null){
        return <>
            <div>
                <h1>Profile</h1>

                <div>
                    <img src={user.avatar} className={s.ava} alt={user.name}/>
                    <div>{user.name}</div>
                </div>
            </div>
        </>
    }else {
        return <div>Err</div>
    }
}