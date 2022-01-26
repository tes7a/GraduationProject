import React from "react";
import { Card } from "../../api/cards.API";
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import { CardComponent } from "./CardComponent";
import s from  './Cards.module.css'

type CardsType = {
    data: Card[],
    authID: string,
    removeCard: (id: string) => void,
    editHandler: (id: string, name: string) => void,
}

export const Cards: React.FC<CardsType> = ({data,authID,removeCard,editHandler}) => {
    return (
        <div>
            <div>
            </div>
            <h2>Cards Packs list</h2>
            <div>
                <SuperInputText/>
                <SuperButton >
                    Add new Card
                </SuperButton>
            </div>
            <table className={s.cards}>
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
                {data.map(d => <CardComponent key={d._id} card={d} authID={authID} editHandler={editHandler}
                                      removeCard={removeCard} url={''}/>)}
                </tbody>
            </table>
            <button>get Cards Packs</button>
        </div>
    )
}