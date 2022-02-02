import { Dispatch } from "redux";
import {Card, CardsAPI, CardsResp, GetDataType, GradeData, PostCardData, PutDataType} from "../../api/cards.API";
import {setAppErrorAC, setStatusAppAC} from "../../app/app-reducer";
import {AppRootStateType, ThunkActionType} from "../../app/store";

const initialCardsState: intialCardsStateType = {
    cards: [],
    page: 1,
    pageCount: 10,
    cardsTotalCount: 10,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
    totalCount: 0,
}

export const CardsReducers = (state = initialCardsState, action: ActionsCardsType): intialCardsStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {...state, ...action.cards}
        case "cards/SET-CARDS-TOTAL-COUNT":
            return {...state, totalCount: action.totalCount}
        case "cards/SET-CARDS-PAGE":
            return {...state, page: action.page}
        case "CARDS/UPDATE-GRADE":
            return {...state, cards: state.cards.map(card => card.cardsPack_id === action.id ? {...card, grade: action.grade} : card)}
        default:
            return state
    }
}

// action
const setCards = (cards: CardsResp) => ({type: 'cards/SET-CARDS', cards} as const);
const setCardsTotalCount = (totalCount: number) => ({type: 'cards/SET-CARDS-TOTAL-COUNT', totalCount} as const);
const setCardsPage = (page: number) => ({type: 'cards/SET-CARDS-PAGE', page} as const);
export const gradeCard = (id: string, grade: number) => ({type: "CARDS/UPDATE-GRADE",id,grade} as const)

//thunk
export const getCards = (data: GetDataType) => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    CardsAPI.getCards(data)
        .then(res => {
            dispatch(setCards(res.data))
            dispatch(setCardsTotalCount(res.data.cardsTotalCount));
            dispatch(setCardsPage(res.data.page));
            dispatch(setAppErrorAC(''));
        })
        .catch(err => {
            console.log(err)
            dispatch(setAppErrorAC(err.response.data.error));
            dispatch(setStatusAppAC('failed'));
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'));
        })
}

export const postCard = (data: PostCardData): ThunkActionType => (dispatch) => {
    CardsAPI.postCard(data)
        .then(res => {
            dispatch(getCards({}))
            dispatch(setAppErrorAC(''));
        })
}

export const deleteCard = (id: string, cardsPack_id: string): ThunkActionType  => (dispatch) => {
    CardsAPI.deleteCard(id)
        .then(res => {
            dispatch(getCards({cardsPack_id}))
            dispatch(setAppErrorAC(''));
        })
}

export const putCard = (data: PutDataType, cardsPack_id: string): ThunkActionType => (dispatch) => {
    CardsAPI.putCard(data)
        .then(res => {
            dispatch(getCards({cardsPack_id}))
            dispatch(setAppErrorAC(''));
        })
}

export const gradeCards = (grade: number, id: string): ThunkActionType => (dispatch) =>{
    CardsAPI.grade(grade, id)
        .then(gradeCard(id, grade) as any)

}
//type
export type ActionsCardsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setCardsPage>
    | ReturnType<typeof gradeCard>


type intialCardsStateType = CardsResp & {
    totalCount: number,
};