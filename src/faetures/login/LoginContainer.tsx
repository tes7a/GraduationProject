import {Login} from "./Login";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {authorizedTC} from "./login-reducer";

export const LoginContainer = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('nya-admin@nya.nya');
    const [password, setPassword] = useState('1qazxcvBG');
    const [rememberMe, setRememberMe] = useState(false);

    const onChangeEmail = (value: string) => {
        setEmail(value);
    }

    const onChangePassword = (value: string) => {
        setPassword(value);
    }

    const onChangeRememberMe = (value: boolean) => {
        setRememberMe(value);
    }

    const authorized = () => {
        dispatch(authorizedTC(email, password, rememberMe));
    }

    return (
        <Login
            email={email}
            password={password}
            rememberMe={rememberMe}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onChangeRememberMe={onChangeRememberMe}
            authorized={authorized}
        />
    )
}