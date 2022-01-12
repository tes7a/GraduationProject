import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import styles from "./ForgotPassword.module.css"
import SuperButton from "../../components/SuperButton/SuperButton";
import {Link, useParams} from "react-router-dom";
import { createRequestRecoveryPasswordTC } from "./password-recovery-reducer";
import {AppRootStateType} from "../../app/store";

export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const changeEmail = (value: string) => {
        setEmail(value);
    };

    const message = `
        <div style="background-color: #f4ffd4; padding: 15px">
            password recovery link: 
            <a href="tes7a.github.io/GraduationProject/#/forgot-password/$token$" style="color: #913ab7;">link</a>
        </div>
    `;

    const sendDataForPasswordRecovery = () => {
        dispatch(createRequestRecoveryPasswordTC({email, message}))
    };


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
            <form className={styles.formForgotPassword}>
                <div className={styles.title}>It-incubator</div>
                <div className={styles.subtitle}>Forgot your password?</div>
                <div className={styles.formEmail}>
                    <label className={styles.labelInput} htmlFor="email">Email</label>
                    <SuperInputText onChangeText={changeEmail} error={error} id="email"/>
                </div>
                <div className={styles.blockBtn}>
                    <SuperButton onClick={sendDataForPasswordRecovery} type="submit">Send Instructions</SuperButton>
                </div>
                <div>Did you remember your password?</div>
                <div><Link to={"/login"}>Try logging in</Link></div>
            </form>
        </>
    )
};

