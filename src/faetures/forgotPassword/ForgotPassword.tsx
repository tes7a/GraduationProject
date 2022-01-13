import React, {useState} from "react";
import {useDispatch} from "react-redux";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import styles from "./ForgotPassword.module.css"
import SuperButton from "../../components/SuperButton/SuperButton";
import {Link} from "react-router-dom";
import {createForgotPasswordRequestTC} from "./forgot-password-reducer";

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
            <a href="http://localhost:3000/#/newPassword/$token$" style="color: #913ab7;">link</a>
        </div>
    `;

    const sendDataForPasswordRecovery = () => {
        dispatch(createForgotPasswordRequestTC({email, message}))
    };


    return (
        <>
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

