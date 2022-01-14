import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import styles from "./NewPassword.module.css"
import SuperButton from "../../components/SuperButton/SuperButton";
import {Link, Navigate, useParams} from "react-router-dom";
import {AppRootStateType} from "../../app/store";
import {createNewPasswordTC} from "./new-password-reducer";

export const NewPassword = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState<string>("");
    const { token } = useParams<"token">();
    const status = useSelector<AppRootStateType, string>((state) => state.newPassword.status);
    // const error = useSelector<AppRootStateType, string>(state => state.newPassword.error);
    const isChangedPassword = useSelector<AppRootStateType, boolean>(state => state.newPassword.isChangedPassword);

    const changePassword = (value: string) => {
        setPassword(value);
    };

    const createNewPassword = () => {
        dispatch(createNewPasswordTC({password, token}));
    };

    if (isChangedPassword) {
        return <Navigate to="/login"/>
    }


    return (
        <>
            <form className={styles.formNewPassword}>
                <div className={styles.title}>It-incubator</div>
                <div className={styles.subtitle}>Create new password</div>
                <div className={styles.formEmail}>
                    <label className={styles.labelInput} htmlFor="password">Password</label>
                    <SuperInputText onChangeText={changePassword} id="password"/>
                </div>
                <div>Create new password and we will send you further instructions to email</div>
                <div className={styles.blockBtn}>
                    <SuperButton onClick={createNewPassword} disabled={status === "loading"} type="submit" className={"primaryBtn"}>Create new password</SuperButton>
                </div>
            </form>
        </>
    )
};

