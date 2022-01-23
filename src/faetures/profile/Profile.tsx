import React from "react";
import {LoginUserInfo } from "../../api/authAPI";
import s from './profile.module.css'


type ProfileProps = {
    user: LoginUserInfo
}

export const Profile: React.FC<ProfileProps> = ({user}) => {
    return <div className={s.ava}>
        <div>
            <h2 className={s.profileStyle}>Profile</h2>
            <div>
                <img src={user.avatar} alt={user.name} className={s.img}/>
                <div>{user.name}</div>
            </div>
        </div>
    </div>
}