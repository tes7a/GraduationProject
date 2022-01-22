import React from "react";
import {PackDataType} from "../../api/packsAPI";
import {Pack} from "./Pack";
import s from './Packs.module.css';
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import SuperButton from "../../components/SuperButton/SuperButton";
import {MyPagination} from "../../hooks/MyPagination";


export const Packs = React.memo(function (
    {
        getPacks,
        getMyPacks,
        totalCount,
        currentPage,
        removePack,
        packs,
        authID,
        searchValue,
        onChangeSearchValue,
        addPacks,
        editHandler,
        changeNumberPage,
        ...props
    }:PacksPropsType
){

    console.log('Packs');
    return (
        <div>
            <div>
                <button onClick={getPacks}>All Packs</button>
                <button onClick={getMyPacks}>My Packs</button>
            </div>
            <h2>Cards Packs list</h2>
            <div>
                <SuperInputText value={searchValue} onChangeText={onChangeSearchValue}/>
                <SuperButton onClick={addPacks}>
                    Add new pack
                </SuperButton>
            </div>
            <table className={s.packs}>
                <thead className={s.thead}>
                <tr>
                    <td>Name</td>
                    <td>Cards</td>
                    <td>Last Updated</td>
                    <td>Created by</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {packs.map(m => <Pack key={m._id} pack={m} authID={authID} editHandler={editHandler}
                                      removePack={removePack}/>)}
                </tbody>
            </table>
            <MyPagination totalCount={totalCount} currentPage={currentPage} onClickHandler={changeNumberPage}/>
        </div>
    )
})

type PacksPropsType = {
    getPacks: () => void
    getMyPacks: () => void
    packs: Array<PackDataType>
    authID: string
    searchValue: string
    onChangeSearchValue: (value: string) => void
    addPacks: () => void
    editHandler: (id: string, name: string) => void
    removePack: (id: string) => void
    totalCount: number
    currentPage: number
    changeNumberPage: (value: number) => void
}