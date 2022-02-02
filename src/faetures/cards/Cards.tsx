import React, { useEffect } from "react";
import { Card, CardsAPI } from "../../api/cards.API";
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import { MyPagination } from "../../components/pagination/MyPagination";
import { CardComponent } from "./CardComponent";
import { postCard } from "./cards-reducer";
import s from  './Cards.module.css'

type CardsType = {
    cards: Card[],
    authID: string,
    removeCard: (id: string) => void,
    editHandler: (id: string, name: string) => void,
    cardsTotalCount: number,
    page: number,
    changeNumberPage: (value: number) => void,
    addCard: () => void,
}

export const Cards: React.FC<CardsType> = (
    {cards,authID,removeCard,editHandler, cardsTotalCount,page, changeNumberPage, addCard}
) => {
    return (
        <div>
            <div>
            </div>
            <h2>Cards Pack list</h2>
            <div>
                <SuperInputText/>
                <SuperButton onClick={addCard}>
                    Add new Card
                </SuperButton>
            </div>
            <table className={s.cards}>
                <thead className={s.thead}>
                <tr>
                    <td>Question</td>
                    <td>Answer</td>
                    <td>Grade</td>
                    <td>Update</td>
                    <td>URL</td>
                </tr>
                </thead>
                <tbody>
                {cards.map(c => <CardComponent key={c._id} card={c} authID={authID} editHandler={editHandler}
                                      removeCard={removeCard} url={''}/>)}
                </tbody>
            </table>
            <MyPagination totalCount={cardsTotalCount} currentPage={page} onClickHandler={changeNumberPage}/>
        </div>
    )
}