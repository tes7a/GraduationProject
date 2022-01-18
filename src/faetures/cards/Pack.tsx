import React from "react";
import {PackDataType} from "../../api/packsAPI";
import SuperButton from "../../components/SuperButton/SuperButton";

export const Pack: React.FC<CardsPackPropsType> = ({pack, authID, ...props}: CardsPackPropsType) => {
    return (
        <tr>
            <td>{pack.name}</td>
            <td>{pack.cardsCount}</td>
            <td>{pack.updated}</td>
            <td>{pack.user_name}</td>
            <td>
                {authID === pack.user_id && <SuperButton red>Delete</SuperButton>}
                {authID === pack.user_id && <SuperButton>Edit</SuperButton>}
                <SuperButton>Learn</SuperButton>
            </td>
        </tr>
    )
}

type CardsPackPropsType = {
    pack: PackDataType
    authID: string
}