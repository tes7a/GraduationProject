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
                <NavLink className={s.active} to={PATH.SIGNIN}>Signin</NavLink>
                <NavLink className={s.active} to={PATH.PASSWORD_RECOVERY}>PassRec</NavLink>
                <NavLink className={s.active} to={PATH.REGISTRATION}>Registration</NavLink>
                <NavLink className={s.active} to={PATH.TEST}>Test</NavLink>
                <NavLink className={s.active} to={PATH.ERROR}>404</NavLink>
            </nav>
        </div>
    )

}