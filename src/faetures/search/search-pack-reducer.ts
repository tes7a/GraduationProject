import {Dispatch} from "redux";
import {getPacksAC, PacksReducerActionsType} from "../packs/PacksReducer";

let initialState = {
    maxCardsCount: 0,
    minCardsCount: 0,
    packName: ""
};

export type InitialStateType = typeof initialState;

export const searchPackReducer = (state: InitialStateType = initialState, action: SearchPackReducerActionsType): InitialStateType => {
    switch (action.type) {
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

//types
export type setSoughtPacksActionsType = ReturnType<typeof setSoughtPackNameAC>;
export type setSoughtMinMaxCountCardsActionsType = ReturnType<typeof setSoughtMinMaxCountCardsAC>;
export type SearchPackReducerActionsType = PacksReducerActionsType
    | setSoughtPacksActionsType
    | setSoughtMinMaxCountCardsActionsType
