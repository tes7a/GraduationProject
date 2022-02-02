import React from "react";
import {Card} from "../../api/cards.API";
import { DeleteModal } from "../../components/modals/DeleteModal";
import SuperButton from "../../components/SuperButton/SuperButton";

type CardPropsType = {
    id: string
    authID: string
    editCard: (id: string, name: string) => void
    removeCard: (id: string) => void
    url: string
    question: string
    answer: string
    grade: number
    updated: string
    user_id: string
}

export const CardComponent: React.FC<CardPropsType> = ({id,editCard,removeCard,authID,url, question, answer,grade,updated,user_id,}) => {
    return (
        <tr>
            <td>{question}</td>
            <td>{answer}</td>
            <td>{grade}</td>
            <td>{updated}</td>
            <td>{url}</td>
            <td>
                {authID === user_id &&
                <SuperButton red onClick={() => removeCard(id)}>Delete</SuperButton>}
                <SuperButton onClick={() => editCard(id, question)}>Edit</SuperButton>
                <SuperButton>Learn</SuperButton>
            </td>
        </tr>
    )
}

