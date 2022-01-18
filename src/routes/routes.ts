import React, {FC} from "react";
import { Login } from "../faetures/login/Login";
import { Profile } from "../faetures/profile/Profile";
import { Registration } from "../faetures/reg/Registration";
import { TestComponent } from "../trash/TestComponent";
import { Err404 } from "../utils/Err404";
import {ForgotPassword} from "../faetures/forgotPassword/ForgotPassword";
import {NewPassword} from "../faetures/newPassword/NewPassword";
import { LoginContainer } from "../faetures/login/LoginContainer";
import { ProfileContainer } from "../faetures/profile/ProfileContainer";
import {CardsPacksContainer} from "../faetures/cards/CardsPacksContainer";

export enum PATH_ {
    EMPTY = '',
    ERROR = '/404',
    PROFILE = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    FORGOT_PASSWORD = '/forgot-password',
    NEW_PASSWORD = '/create-new-password',
    TEST = '/test'
}

export const PATH = {
    EMPTY: '/',
    ERROR: '/404',
    PROFILE: '/',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    FORGOT_PASSWORD: '/forgot-password',
    NEW_PASSWORD: '/create-new-password',
    TEST: '/test',
    CARDS_PACKS:'/cards-packs'
}

type RoutesType = {
    path: string,
    component: () => JSX.Element
}

export const publicRoutes: RoutesType[] = [
    {path: PATH.PROFILE, component: ProfileContainer},
    {path: PATH.REGISTRATION, component: Registration},
    {path: PATH.LOGIN, component: LoginContainer},
    {path: PATH.FORGOT_PASSWORD, component: ForgotPassword},
    {path: PATH.NEW_PASSWORD, component: NewPassword},
    {path: PATH.CARDS_PACKS, component: CardsPacksContainer},
    {path: PATH.ERROR, component: Err404},
    {path: PATH.TEST, component: TestComponent}
]