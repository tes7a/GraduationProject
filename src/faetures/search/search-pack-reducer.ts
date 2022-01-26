import {Dispatch} from "redux";
import {searchAPI} from "./search-api";
import {getPacksAC, PacksReducerActionsType} from "../packs/PacksReducer";

let initialState = {
    maxCardsCount: 40,
    minCardsCount: 0,
    packName: ""
};

export type InitialStateType = typeof initialState;

export const searchPackReducer = (state: InitialStateType = initialState, action: SearchPackReducerActionsType): InitialStateType => {
    switch (action.type) {
        // case "packs/GET-PACKS":
        //     return {...state, packs: action.packs};
        case "searchPack/SET-SOUGHT-PACK-NAMES":
            return {...state, packName: action.packName};
        case "searchPack/SET-SOUGHT-MIN-MAX-COUNT-CARDS":
            return {...state, minCardsCount: action.cardsCount[0], maxCardsCount: action.cardsCount[1]};
        default:
            return state;
    }
};


export const setSoughtPackNameAC = (packName: string) => ({type: 'searchPack/SET-SOUGHT-PACK-NAMES', packName} as const);
export const setSoughtMinMaxCountCardsAC = (cardsCount: [number, number]) => ({type: 'searchPack/SET-SOUGHT-MIN-MAX-COUNT-CARDS', cardsCount} as const);

//thunks
// export const searchPacks = (data: PackType) => (dispatch: ThunkDispatch) => {
//     searchAPI.searchPacks(data)
//         .then(response => {
//             dispatch(getPacksAC(response.data.cardPacks));
//         })
//         .catch(error => {
//             return "some error"
//         });
// };

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
}

export type setSoughtPacksActionsType = ReturnType<typeof setSoughtPackNameAC>;
export type setSoughtMinMaxCountCardsActionsType = ReturnType<typeof setSoughtMinMaxCountCardsAC>;
export type SearchPackReducerActionsType = PacksReducerActionsType
    | setSoughtPacksActionsType
    | setSoughtMinMaxCountCardsActionsType
// type ThunkDispatch = Dispatch<SearchPackReducerActionsType>
