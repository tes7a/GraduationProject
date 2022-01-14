import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import styles from "./ForgotPassword.module.css"
import SuperButton from "../../components/SuperButton/SuperButton";
import {Link} from "react-router-dom";
import {createForgotPasswordRequestTC} from "./forgot-password-reducer";
import {AppRootStateType} from "../../app/store";

export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const status = useSelector<AppRootStateType, string>((state) => state.forgotPassword.status);
    const isCreateForgotPasswordRequest = useSelector<AppRootStateType, boolean>(state => state.newPassword.isChangedPassword);

    const changeEmail = (value: string) => {
        setEmail(value);
    };

    const message = `
        <div style="background-color: #f4ffd4; padding: 15px">
            password recovery link: 
            <a href="http://localhost:3000/create-new-password/$token$" style="color: #913ab7;">link</a>
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
                { isCreateForgotPasswordRequest && <div style={{color: "green"}}>Success</div>}
                <div className={styles.blockBtn}>
                    <SuperButton onClick={sendDataForPasswordRecovery} disabled={status === "loading"} type="submit">Send Instructions</SuperButton>
                </div>
                <div>Did you remember your password?</div>
                <div><Link to={"/login"}>Try logging in</Link></div>
            </form>
        </>
    )
};

