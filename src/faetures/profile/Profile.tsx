import React from "react";
import {LoginUserInfo} from "../../api/authAPI";
import s from './profile.module.css'
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperInputText from "../../components/SuperInputText/SuperInputText";


type ProfileProps = {
    user: LoginUserInfo
    logout: () => void
    changeEditMode: () => void
    changeName: (value: string) => void
    name: string
    editMode: boolean
    updateUserInfo: () => void
}

export const Profile: React.FC<ProfileProps> = (
    {user, logout, changeEditMode, editMode, changeName, name, updateUserInfo}
) => {
    return <div className={s.profile}>
        <h3 className={s.profileTitle}>Personal information</h3>
        <div className={s.profileInfo}>
            <img
                src={user.avatar ? user.avatar : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png'}
                alt={user.name} className={s.profilePhoto}/>
            {editMode
                ? <div className={s.profileItem}>
                    <SuperInputText className={s.profileFields} value={name} onChangeText={changeName}/>
                </div>
                : <div className={s.profileName}>{user.name}</div>}
        </div>
        <div className={s.profileButtonsBlock}>
            {editMode
                ? <SuperButton onClick={updateUserInfo}>Save</SuperButton>
                : <SuperButton onClick={changeEditMode}>Edit</SuperButton>
            }

            <SuperButton onClick={logout}>LogOut</SuperButton>
        </div>
    </div>
}