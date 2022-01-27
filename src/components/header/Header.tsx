import React, {FC} from "react";
import {Link, NavLink, useHref, useLocation} from "react-router-dom";
import {PATH} from "../../routes/routes";
import s from './header.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";

export const Header: FC = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const url = useLocation();

    if (!isLoggedIn) {
        return (<></>);
    }

    return (
        <div className={s.header}>
            <h3 className={s.headerTitle}>IT-INCUBATOR</h3>
            <nav className={s.nav}>
                <NavLink className={`${s.headerLink} ${url.pathname === `${PATH.PROFILE}` ? `${s.active}` : ''}`}
                         to={PATH.PROFILE}>Profile</NavLink>
                <NavLink className={`${s.headerLink} ${url.pathname === `${PATH.PACKS}` ? `${s.active}` : ''}`}
                         to={PATH.PACKS}>Packs</NavLink>
            </nav>
        </div>
    )

}