import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../../routes/routes";
import s from './header.module.css'

export const Header: FC = () => {
    return(
        <div className={s.wrapper}>
            <nav className={s.container}>
                <NavLink className={s.active} to={PATH.PROFILE}>Profile</NavLink>
                <NavLink className={s.active} to={PATH.LOGIN}>Login</NavLink>
                <NavLink className={s.active} to={PATH.FORGOT_PASSWORD}>Forgot password</NavLink>
                <NavLink className={s.active} to={PATH.NEW_PASSWORD}>New password</NavLink>
                <NavLink className={s.active} to={PATH.REGISTRATION}>Registration</NavLink>
                <NavLink className={s.active} to={PATH.CARDS_PACKS}>CardsPack</NavLink>
                <NavLink className={s.active} to={PATH.TEST}>Test</NavLink>
                <NavLink className={s.active} to={PATH.ERROR}>404</NavLink>
            </nav>
        </div>
    )

}