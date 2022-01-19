import React, {useState} from "react";
import {Link} from "react-router-dom";
import classes from './Registration.module.css';
import {useDispatch} from "react-redux";
import {registerTC} from "./reg-reducer";
import SuperInputText from "../../components/SuperInputText/SuperInputText";


export const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secPass, setSecPass] = useState('');
    const [err, setErr] = useState('');
    const [emailErr, setEmailErr] = useState('')
    const [passErr, setPassErr] = useState('')


    const dispatch = useDispatch();


    const setEmailHandler = (value: string) => setEmail(value);
    const setPasswordHandler = (value: string) => setPassword(value);
    const setSecPassHandler = (value: string) => setSecPass(value);

    const registrationSubmit =  () => {
        dispatch(registerTC({email, password}));
    }

    const submitBtnHandler = async () => {
        setErr('');
        setPassErr('');
        setEmail('');
        const validation = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
        if (!validation.test(email)) {
            setEmailErr('Email is not correct!');
        } else if (password.length < 8) {
            setPassErr('Passwords must be minimum 7 characters !!!!');
        } else if (password !== secPass) {
            setPassErr('Passwords must be the same!!!!');
        } else {
            registrationSubmit();
        }
    };


    return <>
        <h1>REGISTRATION</h1>
        <div>
            <div>
                <div>Email</div>
                <SuperInputText
                    onChangeText={setEmailHandler}
                    type='email' name='email'
                    placeholder='Email'
                    value={email}
                    error={emailErr}/>
            </div>
            <div>
                <div>Password</div>
                <SuperInputText
                    onChangeText={setPasswordHandler}
                    type='password' name='password'
                    placeholder='Password'
                    value={password}
                    error={passErr}/>
            </div>
            <div>
                <div>Confirm password</div>
                <SuperInputText
                    onChangeText={setSecPassHandler}
                    type='password' name='password'
                    placeholder='Repeat your password'
                    value={secPass}
                    error={passErr}/>
            </div>
            {err !== '' ? <div>{err}</div> : null}
            <button className={classes.signInBtn}
                    onClick={() => submitBtnHandler()}>Sign
                Up
            </button>
            <button><Link to='/login'>Login</Link></button>

        </div>
    </>
}