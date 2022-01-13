import React, {FC} from "react";
import { Login } from "../faetures/login/Login";
import { PasswordRecovery } from "../faetures/passwordRecovery/PasswordRecovery";
import { Profile } from "../faetures/profile/Profile";
import { Registration } from "../faetures/reg/Registration";
import { Signin } from "../faetures/signin/Signin";
import { TestComponent } from "../trash/TestComponent";
import { Err404 } from "../utils/Err404";
import {LoginContainer} from "../faetures/login/LoginContainer";

export enum PATH_ {
    EMPTY = '',
    ERROR = '/404',
    PROFILE = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PASSWORD_RECOVERY = '/passrecovery',
    SIGNIN = '/signin',
    TEST = '/test'
}

export const PATH = {
    EMPTY: '/',
    ERROR: '/404',
    PROFILE: '/',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PASSWORD_RECOVERY: '/passrecovery',
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
    {path: PATH.LOGIN, component: LoginContainer},
    {path: PATH.SIGNIN, component: Signin},
    {path: PATH.PASSWORD_RECOVERY, component: PasswordRecovery},
    {path: PATH.ERROR, component: Err404},
    {path: PATH.TEST, component: TestComponent}
]