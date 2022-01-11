import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {Err404} from "../utils/Err404";
import {Profile} from "../faetures/Profile";
import {Login} from "../faetures/login/Login";
import {Signin} from "../faetures/signin/Signin";
import {ForgotPassword} from "../faetures/passwordRecovery/ForgotPassword";
import {Registration} from "../faetures/reg/Registration";
import {TestComponent} from "../trash/TestComponent";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/forgot" element={<ForgotPassword/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/test" element={<TestComponent/>}/>
            <Route path="/404" element={<Err404/>}/>
            <Route path="/*" element={<Navigate to='/404'/>}/>
        </Routes>
    );
}

export default App;
