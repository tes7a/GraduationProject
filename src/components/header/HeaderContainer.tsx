import {Header} from "./Header";
import {PATH} from "../../routes/routes";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {useLocation} from "react-router-dom";
import {RequestStatusType} from "../../app/app-reducer";
import React from "react";

export const HeaderContainer:React.FC = () => {
    const links:linksType = [
        {path:PATH.PROFILE,name:'Profile'},
        {path:PATH.PACKS,name:'Packs'}
    ]
    return(
        <Header links={links}/>
    )
}

type linkType = {
    path:string
    name:string
}
export type linksType = linkType[];