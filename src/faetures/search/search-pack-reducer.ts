import {Dispatch} from "redux";
import {searchAPI} from "./search-api";

let initialState = {
    cardPacks: [
        {
            _id: "",
            user_id: "",
            name: "n",
            path: "",
            cardsCount: 0,
            grade: 0,
            shots: 0,
            rating: 0,
            type: "",
            created: "",
            updated: "",
            __v: 0
        },
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0
};

export type InitialStateType = typeof initialState;

export const searchReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "search/SET-FIND-PACKS":
            return {...state, cardPacks: action.packs};
        default:
            return state;
    }
};

//actions
export const setFoundPacksAC = (packs: PackType[]) => ({type: 'search/SET-FIND-PACKS', packs} as const);


//thunks
export const searchPacks = (text: any) => (dispatch: ThunkDispatch) => {
    searchAPI.searchPacks(text)
        .then(response => {
            dispatch(setFoundPacksAC(response.data.cardPacks));
        })
        .catch(error => {
            return "some error"
        });
};

export type ResponseGetPacksType = {
    cardPacks: PackType[],
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type PackType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v:number
}



export type setFoundPacksType = ReturnType<typeof setFoundPacksAC>;
type ActionsType = setFoundPacksType
type ThunkDispatch = Dispatch<ActionsType>
