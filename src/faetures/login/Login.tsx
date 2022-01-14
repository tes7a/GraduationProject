import React, {ChangeEvent} from "react";
import {NavLink} from "react-router-dom";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import SuperCheckbox from "../../components/SuperCheckbox/SuperCheckbox";
import SuperButton from "../../components/SuperButton/SuperButton";

export const Login = (
    {email, password, rememberMe, onChangeEmail, onChangePassword, onChangeRememberMe, authorized}: LoginPropsType
) => {
    return (
        <div>
            <h1>Login Page</h1>
            <div>
                <SuperInputText
                    onChangeText={onChangeEmail}
                    type='text' name='email'
                    placeholder='Email'
                    value={email}
                />
                <SuperInputText
                    onChangeText={onChangePassword}
                    type='password' name='password'
                    placeholder='Password'
                    value={password}
                />
                <SuperCheckbox onChangeChecked={onChangeRememberMe}>Remember Me</SuperCheckbox>

                <div>
                    <NavLink to={'/passrecovery'}>Forgot password?</NavLink>
                </div>
                <SuperButton onClick={authorized}>SingIn</SuperButton>
                <div>
                    <NavLink to={'/registration'}>Registration</NavLink>
                </div>
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