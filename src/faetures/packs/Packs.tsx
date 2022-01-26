import React from "react";
import {PackDataType} from "../../api/packsAPI";
import {Pack} from "./Pack";
import s from './Packs.module.css';
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import SuperButton from "../../components/SuperButton/SuperButton";
import {MyPagination} from "../../hooks/MyPagination";
import {Search} from "../search/Search";
import {Sort} from "../../utils/Sort";
import {SearchPack} from "../search/SearchPack";
import { Link } from "react-router-dom";
import { CardsContainer } from "../cards/CardsContainer";


export const Packs = React.memo(function (
    {
        getPacks,
        sortMethod,
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
        sortCallback,
        ...props
    }:PacksPropsType
){

    return (
        <div>
            <div><Link to={'/cards'}>Cards</Link></div>
            <div>
                <button onClick={getPacks}>All Packs</button>
                <button onClick={getMyPacks}>My Packs</button>
            </div>
            <h2>Cards Packs list</h2>
            <div>
                <SuperInputText value={searchValue} onChangeText={onChangeSearchValue}/>
                <Search/>
                <SuperButton onClick={addPacks}>
                    Add new pack
                </SuperButton>
            </div>
            <SearchPack/>
            <table className={s.packs}>
                <thead className={s.thead}>
                <tr>
                    <td><Sort name={'name'} sortCallback={sortCallback} sortMethod={sortMethod}>Name</Sort></td>
                    <td><Sort name={'cardsCount'} sortCallback={sortCallback} sortMethod={sortMethod}>Cards</Sort></td>
                    <td><Sort name={'updated'} sortCallback={sortCallback} sortMethod={sortMethod}>Last
                        Updated</Sort></td>
                    <td><Sort name={'created'} sortCallback={sortCallback} sortMethod={sortMethod}>Created by</Sort>
                    </td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {packs.map(m => <Pack key={m._id} pack={m} authID={authID} editHandler={editHandler}
                                      removePack={removePack}/>)}
                </tbody>
            </table>
            <button onClick={getPacks}>get Cards Packs</button>
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
    sortCallback: (sort: string) => void,
    sortMethod: string | undefined
}