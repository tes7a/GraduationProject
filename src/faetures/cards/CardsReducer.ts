import {Dispatch} from "redux";
import {CardPackDataType, CardsAPI} from "../../api/cardsAPI";
import {setStatusAppAC} from "../../app/app-reducer";

let initialState: CardsReducerStateType = {
    cards: []
}

export const CardsReducer = (state: CardsReducerStateType = initialState, action: CardsReducerActionType) => {
    switch (action.type) {
        case "cards/GET-CARDS-PACKS":
            return {...state, cards: action.cardsPacks}
        default:
            return state;
    }
}

//Actions
const getCardsPacksAC = (cardsPacks: Array<CardPackDataType>) => ({type: 'cards/GET-CARDS-PACKS', cardsPacks} as const);

//Thunks
export const getCardsPacksTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    CardsAPI.getCards()
        .then(res => {
            dispatch(getCardsPacksAC(res.data.cardPacks));
            dispatch(setStatusAppAC('succeeded'));
        })
        .catch(e => {
            console.log(e);
            dispatch(setStatusAppAC('failed'));
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'));
        })
}
//Types
type CardsReducerStateType = {
    cards: Array<CardPackDataType>
}
type CardsReducerActionType = ReturnType<typeof getCardsPacksAC>;