import React from "react";
import { Link, NavLink } from "react-router-dom";
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperCheckbox from "../../components/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import s from './login.module.css'

export const Login = (
    {email, password, rememberMe, onChangeEmail, onChangePassword, onChangeRememberMe, authorized}: LoginPropsType
) => {
    return (
            <div className={s.loginForm}>
                <h3 className={s.head}>Login</h3>
                <div className={s.emailBlock}>
                    <label className={s.emailLabel}>Email</label>
                    <SuperInputText onChangeText={onChangeEmail}
                                    type='text' name='email'
                                    placeholder='Email'
                                    value={email}/>
                </div>
                <div className={s.passBlock}>
                    <label className={s.passLabel}>Password</label>
                    <SuperInputText  onChangeText={onChangePassword}
                                     type='password' name='password'
                                     placeholder='Password'
                                     value={password}/>
                </div>
                <div><SuperButton onClick={authorized}>Sign In</SuperButton ></div>
                <div className={s.checkBox}>
                    <SuperCheckbox onChangeChecked={onChangeRememberMe}>Remember Me?</SuperCheckbox>
                </div>
                <div className={s.links}>
                    <Link to={'/forgot-password'}>Forgot?</Link>
                    <Link to={'/registration'}>Register</Link>
                </div>
            </div>
    )
}

type LoginPropsType = {
    email: string
    password: string
    rememberMe: boolean
    onChangeEmail: (value: string) => void
    onChangePassword: (value: string) => void
    onChangeRememberMe: (value: boolean) => void
    authorized: () => void
}