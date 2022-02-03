import React, { useEffect } from "react";
import { Card, CardsAPI } from "../../api/cards.API";
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import { MyPagination } from "../../hooks/MyPagination";
import { CardComponent } from "./CardComponent";
import { postCard } from "./cards-reducer";
import s from  './Cards.module.css'

type CardsType = {
    cards: Card[],
    authID: string,
    removeCard: (id: string) => void,
    editCard: (id: string, name: string) => void,
    cardsTotalCount: number,
    page: number,
    changeNumberPage: (value: number) => void,
    addCard: (value: boolean) => void,
}

export const Cards: React.FC<CardsType> = (
    {cards,authID,removeCard,editCard, cardsTotalCount,page, changeNumberPage, addCard}
) => {
    return (
        <div>
            <div>
            </div>
            <h2>Cards Pack list</h2>
            <div>
                <SuperInputText />
                <SuperButton onClick={() => addCard(true)}>
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
                {cards.map(c =>
                    <CardComponent 
                    key={c._id} id={c._id} question={c.question} 
                    authID={authID} editCard={editCard} removeCard={removeCard} 
                    grade={c.grade} answer={c.answer} updated={c.updated}
                    user_id={c.user_id} url={''}/>)}
                </tbody>
            </table>
            <MyPagination totalCount={cardsTotalCount} currentPage={page} onClickHandler={changeNumberPage}/>
        </div>
    )
}