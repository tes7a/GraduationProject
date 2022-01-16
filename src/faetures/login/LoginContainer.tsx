import {Login} from "./Login";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginTC, logoutTC, setLoginErrorAC} from "./login-reducer";
import {AppRootStateType} from "../../app/store";

export const LoginContainer = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('nya-admin@nya.nya');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('1qazxcvBG');
    const [passError, setPassError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
    const error: string = useSelector<AppRootStateType, string>(state => state.login.error);

    const onChangeEmail = (value: string) => {
        setEmail(value);
        setEmailError('');
        dispatch(setLoginErrorAC(''))
    }

    const onChangePassword = (value: string) => {
        setPassword(value);
        setPassError('');
        dispatch(setLoginErrorAC(''))
    }

    const onChangeRememberMe = (value: boolean) => {
        setRememberMe(value);
    }

    const login = () => {
        const validation = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
        if (!validation.test(email)) setEmailError('Email is not correct!');
        if (password.length < 8) setPassError('Password must be more than 7 characters...');
        if (validation.test(email) && password.length > 7) {
            dispatch(loginTC(email, password, rememberMe));
            setEmail('');
            setPassword('');
            setRememberMe(false);
        }
    }

    const logout = () => {
        dispatch(logoutTC());
    }

    if (isLoggedIn) {
        return (
            <div>
                <h3>Пользователь авторизован!</h3>
                <button onClick={logout}>LogOut
                </button>
            </div>
        );
    }

    return (
        <Login
            email={email}
            password={password}
            rememberMe={rememberMe}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onChangeRememberMe={onChangeRememberMe}
            login={login}
            error={error}
            emailError={emailError}
            passError={passError}
        />
    )
}