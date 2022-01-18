import {Packs} from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../routes/routes";
import React, {useEffect} from "react";
import {getPacksTC} from "./PacksReducer";
import {PackDataType} from "../../api/packsAPI";

export const PacksContainer = () => {
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const packs: Array<PackDataType> = useSelector<AppRootStateType, Array<PackDataType>>(state => state.packs.packs);
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const getPacks = () => {
        dispatch(getPacksTC());
    }
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getPacksTC());
        }
    }, [dispatch, packs, isLoggedIn])
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div>
            <Packs
                getPacks={getPacks}
                packs={packs}
                authID={authID}
            />
        </div>
    )
}