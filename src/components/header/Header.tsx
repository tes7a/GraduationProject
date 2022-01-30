import React, {FC} from "react";
import {NavLink, useLocation} from "react-router-dom";
import s from './header.module.css'
import {RequestStatusType} from "../../app/app-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {PATH} from "../../routes/routes";

export const Header = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const url = useLocation().pathname;
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const links = [
        {path:PATH.PROFILE,name:'Profile'},
        {path:PATH.PACKS,name:'Packs'}
    ]

    if (!isLoggedIn) {
        return (<></>);
    }

    return (
        <div className={s.header}>
            <h3 className={s.headerTitle}>IT-INCUBATOR</h3>
            <nav className={s.nav}>
                {
                    links.map((l, i: number) => status !== 'loading'
                        ? <NavLink
                            key={l.name + i}
                            className={`${s.headerLink} ${url === `${l.path}` ? `${s.active}` : ''}`}
                            to={l.path}
                        >
                            {l.name}
                        </NavLink>
                        : <div key={l.name + i}
                               className={`${s.headerLink} ${s.headerDiv} ${url === `${l.path}` ? `${s.active}` : ''}`}>{l.name}</div>)
                }
            </nav>
        </div>
    )

}