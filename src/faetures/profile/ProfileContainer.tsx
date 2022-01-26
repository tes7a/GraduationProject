import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoginUserInfo} from "../../api/authAPI";
import {AppRootStateType} from "../../app/store";
import {Navigate} from 'react-router-dom';
import s from './profile.module.css'
import {PATH} from "../../routes/routes";
import {useEffect} from "react";
import {Profile} from "./Profile";
import {logoutTC, profileInfoTC, updateUserInfoTC} from "../../api/AuthReducer";


export const ProfileContainer = () => {
    const [editMode, setEditMode] = useState(false);
    const user = useSelector<AppRootStateType, LoginUserInfo | null>(state => state.auth.user);
    const [userName, setUserName] = useState('');
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn);
    const error: string = useSelector<AppRootStateType, string>(state => state.auth.error);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutTC());
    }

    const changeEditMode = () => {
        setEditMode(!editMode);
    }

    const changeName = (value: string) => {
        setUserName(value);
    }

    const updateUserInfo = () => {
        if(userName){
            dispatch(updateUserInfoTC({name:userName}));
        }
        setEditMode(false);
    }

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(profileInfoTC())
        }

    }, [dispatch]);

    useEffect(() => {
        if(user) setUserName(user.name);
    }, [user])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    if (user != null) {
        return <div className={s.wrapper}>
            <Profile
                name={userName}
                changeName={changeName}
                updateUserInfo={updateUserInfo}
                editMode={editMode}
                changeEditMode={changeEditMode}
                logout={logout}
                user={user}/>
        </div>
    } else {
        return <div>{error}</div>
    }
}
