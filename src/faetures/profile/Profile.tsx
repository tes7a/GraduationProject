import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoginUserInfo} from "../../api/authAPI";
import {AppRootStateType} from "../../app/store";
import {Navigate} from 'react-router-dom';
import a from "./ava.jpg"
import s from './profile.module.css';
import {PATH} from "../../routes/routes";
import {useEffect} from "react";
import {ProfileInfo} from "./profile-reducer";

type ProfileProps = {
    user: any
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