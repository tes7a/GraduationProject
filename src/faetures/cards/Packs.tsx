import React from "react";
import {PackDataType} from "../../api/packsAPI";
import {Pack} from "./Pack";
import s from './Packs.module.css';
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import SuperButton from "../../components/SuperButton/SuperButton";

export const Packs: React.FC<CardsPropsType> = (
    {getPacks, packs, authID, ...props}
) => {
    return (
        <div>
            <h2>Cards Packs list</h2>
            <div>
                <SuperInputText/>
                <SuperButton>
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
                {packs.map(m => <Pack key={m._id} pack={m} authID={authID}/>)}
                </tbody>
            </table>
            <button onClick={getPacks}>get Cards Packs</button>
        </div>
    )
}

type CardsPropsType = {
    getPacks: () => void
    packs: Array<PackDataType>
    authID: string
}