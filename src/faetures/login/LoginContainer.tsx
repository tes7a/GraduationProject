import {Login} from "./Login";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginTC, logoutTC} from "./login-reducer";
import {AppRootStateType} from "../../app/store";

export const LoginContainer = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('nya-admin@nya.nya');
    const [password, setPassword] = useState('1qazxcvBG');
    const [rememberMe, setRememberMe] = useState(false);
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);

    const onChangeEmail = (value: string) => {
        setEmail(value);
    }

    const onChangePassword = (value: string) => {
        setPassword(value);
    }

    const onChangeRememberMe = (value: boolean) => {
        setRememberMe(value);
    }

    const login = () => {
        dispatch(loginTC(email, password, rememberMe));
        setEmail('');
        setPassword('');
        setRememberMe(false);
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
        />
    )
}