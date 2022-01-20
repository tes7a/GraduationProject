import {Packs} from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../routes/routes";
import React, {useEffect, useState} from "react";
import {getPacksTC} from "./PacksReducer";
import {PackDataType} from "../../api/packsAPI";

export const PacksContainer = () => {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const packs: Array<PackDataType> = useSelector<AppRootStateType, Array<PackDataType>>(state => state.packs.packs);
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);

    const getPacks = () => {
        dispatch(getPacksTC());
    }

    const onChangeSearchValue = (value: string) => {
        setSearchValue(value);
    }

    const addPacks = () => {

    }
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getPacksTC());
        }
    }, [dispatch, packs, isLoggedIn]);

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div>
            <Packs
                getPacks={getPacks}
                addPacks={addPacks}
                onChangeSearchValue={onChangeSearchValue}
                packs={packs}
                authID={authID}
                searchValue={searchValue}
            />
        </div>
    )
}