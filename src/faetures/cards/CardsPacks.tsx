import React from "react";
import {CardPackDataType} from "../../api/cardsAPI";
import {CardsPack} from "./CardsPack";
import s from './Cards.module.css';

export const CardsPacks: React.FC<CardsPropsType> = (
    {getCards, cardsPacks, ...props}
) => {
    return (
        <div>
            <h2>Cards</h2>
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
                {cardsPacks.map(m => <CardsPack key={m._id}{...m}/>)}
                </tbody>
            </table>
            <button onClick={getCards}>getCards</button>
        </div>
    )
}

type CardsPropsType = {
    getCards: () => void
    cardsPacks: Array<CardPackDataType>
}