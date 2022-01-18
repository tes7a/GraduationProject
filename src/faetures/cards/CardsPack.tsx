import React from "react";
import {CardPackDataType} from "../../api/cardsAPI";

export const CardsPack: React.FC<CardsPackPropsType> = (
    {name, cardsCount, updated, user_name}
) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{cardsCount}</td>
            <td>{updated}</td>
            <td>{user_name}</td>
            <td>
                {/*Добавить кнопки: Delete, Edit, Learn*/}
            </td>
        </tr>
    )
}

type CardsPackPropsType = CardPackDataType;