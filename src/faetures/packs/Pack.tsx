import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {PackDataType} from "../../api/packsAPI";
import SuperButton from "../../components/SuperButton/SuperButton";
import {PATH} from "../../routes/routes";

export const Pack: React.FC<PackPropsType> = ({pack, authID, editHandler, removePack, ...props}: PackPropsType) => {
    let navigate = useNavigate()
    
    return (
        <tr>
            <td>{pack.name}</td>
            <td>{pack.cardsCount}</td>
            <td>{pack.updated}</td>
            <td>{pack.user_name}</td>
            <td>
                {authID === pack.user_id && <SuperButton red onClick={() => removePack(pack._id)}>Delete</SuperButton>}
                {authID === pack.user_id &&
                <SuperButton onClick={() => editHandler(pack._id, pack.name)}>Edit</SuperButton>}
                <div>
                    <SuperButton onClick={() => navigate('/cards/' + pack._id)}>Learn</SuperButton>
                </div>
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