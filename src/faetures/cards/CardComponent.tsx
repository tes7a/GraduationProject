import React from "react";
import {Card} from "../../api/cards.API";
import SuperButton from "../../components/SuperButton/SuperButton";

type CardPropsType = {
    card: Card
    authID: string
    editHandler: (id: string, name: string) => void
    removeCard: (id: string) => void
    url: string
}

export const CardComponent: React.FC<CardPropsType> = ({card,editHandler,removeCard,authID,url}) => {
    return (
        <tr>
            <td>{card.question}</td>
            <td>{card.answer}</td>
            <td>{card.grade}</td>
            <td>{card.updated}</td>
            <td>{url}</td>
            <td>
                {authID === card.user_id && <SuperButton red onClick={() => removeCard(card._id)}>Delete</SuperButton>}
                {authID === card.user_id &&
                <SuperButton onClick={() => editHandler(card._id, card.question)}>Edit</SuperButton>}
                <SuperButton>Learn</SuperButton>
            </td>
        </tr>
    )
}

