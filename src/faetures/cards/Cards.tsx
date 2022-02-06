import React, { useEffect } from "react";
import { Card, CardsAPI } from "../../api/cards.API";
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import SuperSelect from "../../components/SuperSelect/SuperSelect";
import {MyPagination} from "../../components/pagination/MyPagination";
import {Sort} from "../../components/sort/Sort";
import {CardComponent} from "./CardComponent";
import s from './Cards.module.css'

type CardsType = {
    cards: Card[],
    authID: string,
    removeCard: (id: string) => void,
    sortCallBack: (sort: string) => void
    editCard: (cardId: string, quest: string) => void,
    cardsTotalCount: number,
    page: number,
    changeNumberPage: (value: number) => void,
    addCard: (value: boolean) => void,
    sortCardsMethod: string | undefined,
    pageCount: number,
    changePageCount: (value: number) => void,
    options: number[]
}

export const Cards: React.FC<CardsType> = (
    {
        cards,
        authID,
        removeCard,
        editCard,
        cardsTotalCount,
        page,
        changeNumberPage,
        addCard,
        sortCallBack,
        sortCardsMethod,
        pageCount,
        changePageCount,
        options
    }
) => {
    return (
        <div>
            <div>
            </div>
            <h2>Cards Pack list</h2>
            <div>
                <SuperInputText/>
                <SuperButton onClick={() => addCard(true)}>
                    Add new Card
                </SuperButton>
            </div>
            <table className={s.table}>
                <thead className={s.thead}>
                <tr>
                    <td><Sort name={'question'} sortMethod={sortCardsMethod} sortCallback={sortCallBack}>Question</Sort>
                    </td>
                    <td><Sort name={'answer'} sortMethod={sortCardsMethod} sortCallback={sortCallBack}>Answer</Sort>
                    </td>
                    <td><Sort name={'updated'} sortMethod={sortCardsMethod} sortCallback={sortCallBack}>Update</Sort>
                    </td>
                    <td><Sort name={'grade'} sortMethod={sortCardsMethod} sortCallback={sortCallBack}>Grade</Sort></td>
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
            <MyPagination totalCount={cardsTotalCount} currentPage={page} onClickHandler={changeNumberPage} pageCount={pageCount}/>
            <div className={s.select}>
                Show Cards Per Page: <SuperSelect
                value={pageCount}
                name='CardPerPage'
                options={options}
                onChangeOption={changePageCount}
            />
            </div>
        </div>
    )
}