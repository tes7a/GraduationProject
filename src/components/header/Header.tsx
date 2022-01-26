import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../../routes/routes";
import s from './header.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";

export const Header: FC = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        return (<></>);
    }
    return (
        <div className={s.header}>
            <h3 className={s.headerTitle}>IT-INCUBATOR</h3>
            <nav className={s.nav}>
                <NavLink className={s.headerLink} to={PATH.PROFILE}>Profile</NavLink>
                <NavLink className={s.headerLink} to={PATH.PACKS}>Packs</NavLink>
            </nav>
        </div>
    )

}