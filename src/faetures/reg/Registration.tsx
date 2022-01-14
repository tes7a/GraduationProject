import React, {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";
import classes from './Registration.module.css'
import axios from "axios";

const url = 'http://localhost:7542/2.0/auth/register';

export const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secPass, setSecPass] = useState('');
    const [err, setErr] = useState('');
    const [pending, setPending] = useState(false);

    const setEmailHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const setPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const setSecPassHandler = (e: ChangeEvent<HTMLInputElement>) => setSecPass(e.target.value);

    const registrationSubmit = async () => {
        setPending(true);
        let registrationResponse = await axios.post(url,{email, password}, {withCredentials: true});
        setPending(false);
        return registrationResponse;
    }

    const submitBtnHandler = async () => {
        setErr('');
        if (email !== '' && password !== '' && secPass !== '') {
            if (password === secPass) {
                await registrationSubmit();
            } else {
                setErr('Passwords must be the same!!!!');
            }
        } else {
            setErr('Fill the fields!!!');
        }
    };

    return <>
        <h1>REGISTRATION</h1>
        <div>

            <div>
                <div>Email</div>
                <input type='email' placeholder='Enter email' value={email}
                       onChange={(e) => setEmailHandler(e)}/>
            </div>
            <div>
                <div>Password</div>
                <input type='password' placeholder='Enter your password'
                       value={password}
                       onChange={(e) => setPasswordHandler(e)}/>
            </div>
            <div>
                <div>Confirm password</div>
                <input type='password' placeholder='Repeat your password'
                       value={secPass} onChange={(e) => setSecPassHandler(e)}/>
            </div>
            {err !== '' ? <div>{err}</div> : null}
            <button className={classes.signInBtn} onClick={submitBtnHandler}>Sign
                in
            </button>
            <button><Link to='/login'>Login</Link></button>

        </div>
    </>
}