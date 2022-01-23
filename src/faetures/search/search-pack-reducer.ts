import {Dispatch} from "redux";
import {searchAPI} from "./search-api";
import {getPacksAC, PacksReducerActionsType} from "../packs/PacksReducer";

let initialState = {
    packs: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0
};

export type InitialStateType = typeof initialState;

export const searchPackReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case "packs/GET-PACKS":
            return {...state, packs: action.packs};
        default:
            return state;
    }
};


//thunks
export const searchPacks = (text: any) => (dispatch: ThunkDispatch) => {
    searchAPI.searchPacks(text)
        .then(response => {
            dispatch(getPacksAC(response.data.cardPacks));
        })
        .catch(error => {
            return "some error"
        });
};

//types
export type ResponseGetPacksType = {
    cardPacks: ResponsePackType[],
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type ResponsePackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type PackType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number
    page?: number
    pageCount?: number
    user_id?: string
}

export type SearchPackReducerActionsType = PacksReducerActionsType
type ThunkDispatch = Dispatch<SearchPackReducerActionsType>
