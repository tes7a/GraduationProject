import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import styles from "./ForgotPassword.module.css"
import SuperButton from "../../components/SuperButton/SuperButton";
import {Link, Navigate, useParams} from "react-router-dom";
import { createRequestRecoveryPasswordTC } from "./password-recovery-reducer";
import {AppRootStateType} from "../../app/store";

export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState<string>("");
    const { token } = useParams<"token">();
    const status = useSelector<AppRootStateType, string>((state) => state.newPassword.status);
    const error = useSelector<AppRootStateType, string>(state => state.newPassword.error);
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
            <div>
                <Link to={'/'}>Profile</Link>
                <Link to={'/test'}>Test</Link>
                <Link to={'/login'}>Login</Link>
                <Link to={'/signin'}>Signin</Link>
                <Link to={'/passrecovery'}>PassRec</Link>
                <Link to={'/registration'}>Reg</Link>
                <Link to={'/404'}>404</Link>
            </div>
            <form>
                <div className={"title"}>It-incubator</div>
                <div className={"subtitle"}>Create new password</div>
                <div className={"formControl formGroupInput"}>
                    <SuperInputText onChangeText={changePassword} error={error} id="password"/>
                    <label className={"labelInput"} htmlFor="password">Password</label>
                </div>
                <div>Create new password and we will send you further instructions to email</div>
                <div className={s.blockBtn}>
                    <SuperButton onClick={createNewPassword} disabled={status === "loading"} type="submit" className={"primaryBtn"}>Create new password</SuperButton>
                </div>
            </form>
        </>
    )
};

