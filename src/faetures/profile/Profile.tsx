import React from "react";
import {LoginUserInfo} from "../../api/authAPI";
import s from './profile.module.css'
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import {CameraOutlined, CheckOutlined, EditOutlined, LogoutOutlined} from "@ant-design/icons";


type ProfileProps = {
    user: LoginUserInfo
    changeEditMode: () => void
    changeName: (value: string) => void
    name: string
    editMode: boolean
    updateUserInfo: () => void
    downloadPhoto: () => void
}

export const Profile: React.FC<ProfileProps> = (
    {user, downloadPhoto, changeEditMode, editMode, changeName, name, updateUserInfo}
) => {
    return <div className={s.profile}>
        <h3 className={s.profileTitle}>Personal information</h3>
        <div className={s.profileInfo}>
            <div className={s.profilePhotoBlock}>
                <img
                    src={user.avatar ? user.avatar : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png'}
                    alt={user.name} className={s.profilePhoto}
                />
                <SuperButton className={s.photoButton} onClick={downloadPhoto}>
                    <CameraOutlined/>
                </SuperButton>
            </div>

            {editMode
                ? <div className={s.profileItem}>
                    <SuperInputText className={s.profileFields} value={name} onChangeText={changeName}/>
                    <SuperButton className={`${s.profileButton} ${s.saveButton}`}
                                 onClick={updateUserInfo}><CheckOutlined/></SuperButton>
                </div>
                : <div className={s.profileName}>
                    <span>{user.name}</span>
                    <SuperButton className={`${s.profileButton} ${s.editButton}`}
                                 onClick={changeEditMode}><EditOutlined/></SuperButton>
                </div>
            }
        </div>
    </div>
}