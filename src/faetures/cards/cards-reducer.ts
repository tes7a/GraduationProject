import { Dispatch } from "redux";
import {CardsAPI, CardsResp, GetDataType } from "../../api/cards.API";

const initialCardsState: intialCardsStateType = {
    cards: [],
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
}

export const CardsReducers = (state = initialCardsState, action: ActionsCardsType): intialCardsStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {...state, ...action.data}
        default: 
            return state
    }
}

// action
const setCards = (data: CardsResp) => ({type: 'cards/SET-CARDS', data}as const);

//thunk

export const fetchCards = (data?: GetDataType) => (dispatch: Dispatch) => {
    CardsAPI.getCards(data) 
        .then(res => {
            dispatch(setCards(res.data))
    })
}

//type

export type ActionsCardsType =
    | ReturnType<typeof setCards>

type intialCardsStateType = CardsResp & {

};