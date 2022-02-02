import React, {useEffect} from 'react';
import {Header} from '../components/header/Header';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {setLoggedInAC} from "../api/AuthReducer";
import classes from "./App.module.css";
import {RequestStatusType, setInitialized} from "./app-reducer";
import {PacksContainer} from '../faetures/packs/PacksContainer';
import {CardsContainer} from '../faetures/cards/CardsContainer';
import {ProfileContainer} from '../faetures/profile/ProfileContainer';
import {Registration} from '../faetures/reg/Registration';
import {LoginContainer} from '../faetures/login/LoginContainer';
import {NewPassword} from '../faetures/newPassword/NewPassword';
import {ForgotPassword} from '../faetures/forgotPassword/ForgotPassword';
import {Route, Routes} from 'react-router-dom';
import {ErrorModal} from "../components/modals/ErrorModal";


export function App() {
    const dispatch = useDispatch();
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const error = useSelector<AppRootStateType, string>(state => state.app.error);
    useEffect(() => {
        dispatch(setInitialized(true));
    }, []);

    useEffect(()=>{
        if(error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\'){
            dispatch(setLoggedInAC(false));
        }
    },[error])

    if (!isInitialized) {
        return <div className={classes.app}></div>
    }
    return (
        <div className={classes.app}>
            <ErrorModal error={error}/>
            <Header/>
            <main className={classes.main}>
                <Routes>
                    <Route path={'/packs'} element={<PacksContainer/>}/>
                    <Route path={'/cards/:id'} element={<CardsContainer/>}/>
                    <Route path={'/'} element={<ProfileContainer/>}/>
                    <Route path={'/login'} element={<LoginContainer/>}/>
                    <Route path={'/registration'} element={<Registration/>}/>
                    <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
                    <Route path={'/create-new-password'} element={<NewPassword/>}/>
                </Routes>
            </main>
        </div>
    );
}


