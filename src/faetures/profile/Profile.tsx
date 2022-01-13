import React from "react";
import { useSelector } from "react-redux";
import { UserDataInfo } from "../../api/authAPI";
import { AppRootStateType } from "../../app/store";
import a from "./ava.jpg"
import s from './profile.module.css'

export const Profile = () => {
    const data = useSelector<AppRootStateType, UserDataInfo>(state => state.profile.data)


    return <>
        <div>
            <h1>Profile</h1>
            
            <div>
                <img src={a} className={s.ava} alt={'123'}/>
            </div>
        </div>
    </>
}