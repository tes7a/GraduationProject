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
import {Spin} from "antd";
import {Login} from "../login/Login";
import {RequestStatusType, setAppErrorAC} from "../../app/app-reducer";


export const ProfileContainer = () => {
    const [editMode, setEditMode] = useState(false);
    const user = useSelector<AppRootStateType, LoginUserInfo | null>(state => state.auth.user);
    const [userName, setUserName] = useState('');
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn);
    const error: string = useSelector<AppRootStateType, string>(state => state.auth.error);
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const dispatch = useDispatch();

    const downloadPhoto = () => {
        dispatch(setAppErrorAC('Sorry, this function is not working now :('))
    }

    const changeEditMode = () => {
        setEditMode(!editMode);
    }

    const changeName = (value: string) => {
        setUserName(value);
    }

    const updateUserInfo = () => {
        if (userName) {
            dispatch(updateUserInfoTC({name: userName}));
        }
        setEditMode(false);
    }

    useEffect(() => {
        dispatch(profileInfoTC())

    }, [dispatch]);

    useEffect(() => {
        if (user) setUserName(user.name);
    }, [user])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    if (user != null) {
        return <div className={s.profileContainer}>
            {
                status === 'loading'
                    ? <Spin size={'large'} tip="Loading..."/>
                    : <Profile
                        name={userName}
                        changeName={changeName}
                        updateUserInfo={updateUserInfo}
                        editMode={editMode}
                        changeEditMode={changeEditMode}
                        user={user}
                        downloadPhoto={downloadPhoto}
                    />
            }

        </div>
    } else {
        return <div>{error}</div>
    }
}
