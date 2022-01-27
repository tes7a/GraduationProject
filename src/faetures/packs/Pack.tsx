import React from "react";
import {PackDataType} from "../../api/packsAPI";
import SuperButton from "../../components/SuperButton/SuperButton";
import s from './../../style/Packs.module.css';

export const Pack: React.FC<PackPropsType> = ({pack, authID, editHandler,removePack, ...props}: PackPropsType) => {
    return (
        <tr>
            <td>{pack.name}</td>
            <td>{pack.cardsCount}</td>
            <td>{pack.updated}</td>
            <td>{pack.user_name}</td>
            <td>
                {authID === pack.user_id && <SuperButton red className={s.packsButtonDelete} onClick={() => removePack(pack._id)}>Delete</SuperButton>}
                {authID === pack.user_id &&
                <SuperButton className={s.packsButton} onClick={() => editHandler(pack._id, pack.name)}>Edit</SuperButton>}
                <SuperButton className={s.packsButton}>Learn</SuperButton>
            </td>
        </tr>
    )
}

type PackPropsType = {
    pack: PackDataType
    authID: string
    editHandler: (id: string, name: string) => void
    removePack: (id: string) => void
}