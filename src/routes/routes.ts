import React, {FC} from "react";
import { Login } from "../faetures/login/Login";
import { Profile } from "../faetures/profile/Profile";
import { Registration } from "../faetures/reg/Registration";
import { Signin } from "../faetures/signin/Signin";
import { TestComponent } from "../trash/TestComponent";
import { Err404 } from "../utils/Err404";
import {ForgotPassword} from "../faetures/passwordRecovery/ForgotPassword";

export enum PATH_ {
    EMPTY = '',
    ERROR = '/404',
    PROFILE = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    FORGOT_PASSWORD = '/forgot-password',
    SIGNIN = '/signin',
    TEST = '/test'
}

export const PATH = {
    EMPTY: '/',
    ERROR: '/404',
    PROFILE: '/',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    FORGOT_PASSWORD: '/forgot-password',
    SIGNIN: '/signin',
    TEST: '/test'
}

type RoutesType = {
    path: string,
    component: () => JSX.Element
}

export const publicRoutes: RoutesType[] = [
    {path: PATH.PROFILE, component: Profile},
    {path: PATH.REGISTRATION, component: Registration},
    {path: PATH.LOGIN, component: Login},
    {path: PATH.SIGNIN, component: Signin},
    {path: PATH.FORGOT_PASSWORD, component: ForgotPassword},
    {path: PATH.ERROR, component: Err404},
    {path: PATH.TEST, component: TestComponent}
]