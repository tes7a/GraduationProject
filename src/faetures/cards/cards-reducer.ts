import { Dispatch } from "redux";
import {Card, CardsAPI, CardsResp, GetDataType, PostCardData } from "../../api/cards.API";
import { setStatusAppAC } from "../../app/app-reducer";
import { AppRootStateType, ThunkActionType } from "../../app/store";

const initialCardsState: intialCardsStateType = {
    cards: [],
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
    totalCount: 0,
}

export const CardsReducers = (state = initialCardsState, action: ActionsCardsType): intialCardsStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {...state, cards: action.cards}
        case "cards/SET-CARDS-TOTAL-COUNT":
            return {...state, totalCount: action.totalCount}
        case "cards/SET-CARDS-PAGE":
            return {...state, page: action.page}
        default: 
            return state
    }
}

// action
const setCards = (cards: Card[]) => ({type: 'cards/SET-CARDS', cards}as const);
const setCardsTotalCount = (totalCount: number) => ({type: 'cards/SET-CARDS-TOTAL-COUNT',totalCount}as const);
const setCardsPage = (page: number) => ({type: 'cards/SET-CARDS-PAGE', page} as const);

//thunk
export const getCards = (id :string): ThunkActionType => (dispatch, getState: () => AppRootStateType) => {
    dispatch(setStatusAppAC('loading'));
    CardsAPI.getCards(id)
        .then(res => {
            dispatch(setCards(res.data.cards));
            dispatch(setCardsTotalCount(res.data.cardsTotalCount));
            dispatch(setCardsPage(res.data.page));
            dispatch(setStatusAppAC('succeeded'));
    })
        .catch(err => {
            console.log(err)
            dispatch(setStatusAppAC('failed'));
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'));
        })
}

export const postCard = (data?: PostCardData): ThunkActionType => (dispatch) => {
    CardsAPI.postCard(data)
        .then(res => {
        })
}
//type
export type ActionsCardsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setCardsPage>
 
type intialCardsStateType = CardsResp & {
    totalCount: number,
};