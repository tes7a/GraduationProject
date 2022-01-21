import {setStatusAppAC} from './../../app/app-reducer';
import {Dispatch} from "redux";
import {getDateType, PackDataType, PacksAPI} from "../../api/packsAPI";
import {ThunkAction} from "redux-thunk";
import {AppRootActionsType, AppRootStateType} from "../../app/store";

let initialState: PacksReducerStateType = {
    packs: [],
    totalCount: 0,
    page: 1
}

export const PacksReducer = (state: PacksReducerStateType = initialState, action: PacksReducerActionsType) => {
    switch (action.type) {
        case "packs/GET-PACKS":
            return {...state, packs: action.packs};
        case "packs/SET-TOTAL-COUNT":
            return {...state, totalCount: action.totalCount};
        case "packs/SET-PAGE":
            return {...state, page: action.page}
        case "packs/CHANGE-PACK-TITLE":
            return {...state, packs: state.packs.map(p => p._id === action.id ? {...p, name: action.name} : p)};
        case "sort/SORT-PACKS": {
            const newState = {
                ...state.packs.sort((a, b) => {
                    if (a.name > b.name) return 1
                    else if (a.name < b.name) return -1
                    else return 0
                })
            }
            return action.payload === "up" ? newState : newState.reverse()
        }
        default:
            return state;
    }
}

//Actions
const getPacksAC = (packs: Array<PackDataType>) => ({type: 'packs/GET-PACKS', packs} as const);
const setPacksTotalCountAC = (totalCount: number) => ({type: 'packs/SET-TOTAL-COUNT', totalCount} as const);
const setPacksPageAC = (page: number) => ({type: 'packs/SET-PAGE', page} as const);
const addPackAC = (pack: PackDataType) => ({type: 'packs/ADD-PACK', pack} as const);
const changePackTitleAC = (id: string, name: string) => ({type: 'packs/CHANGE-PACK-TITLE', id, name} as const);
const removePackAC = (id: string) => ({type: 'packs/REMOVE-PACK', id} as const);
export const sortPacks = (payload: 'up' | 'down') => ({type: 'sort/SORT-PACKS', payload}as const)

//Thunks
export const getPacksTC = (currentPage?: number) => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    PacksAPI.getPacks(currentPage)
        .then(res => {
            dispatch(getPacksAC(res.data.cardPacks));
            dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount));
            dispatch(setPacksPageAC(res.data.page));
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

export const createPackTC = (value: string): ThunkAction<void, AppRootStateType, unknown, AppRootActionsType> => (dispatch) => {
    dispatch(setStatusAppAC('loading'));
    PacksAPI.addPack(value)
        .then(res => {
            // dispatch(addPackAC(res.data.newCardsPack));
            dispatch(getPacksTC(1));
            dispatch(setStatusAppAC('succeeded'));
        }).catch(e => {
        console.log(e);
        dispatch(setStatusAppAC('failed'));
    })
        .finally(() => {
            dispatch(setStatusAppAC('idle'));
        })

}

export const changePackTitleTC = (id: string, name: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    PacksAPI.changePack(id, name)
        .then(res => {
            dispatch(changePackTitleAC(id, name));
            dispatch(setStatusAppAC('succeeded'));
        }).catch(e => {
        console.log(e);
        dispatch(setStatusAppAC('failed'));
    })
        .finally(() => {
            dispatch(setStatusAppAC('idle'));
        })

}

export const removePackTC = (id: string, currentPage: number): ThunkAction<void, AppRootStateType, unknown, AppRootActionsType> => (dispatch) => {
    dispatch(setStatusAppAC('loading'));
    PacksAPI.removePack(id)
        .then(res => {
            dispatch(getPacksTC(currentPage));
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
type PacksReducerStateType = {
    packs: Array<PackDataType>
    totalCount: number
    page: number
}
export type PacksReducerActionsType = ReturnType<typeof getPacksAC>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof setPacksTotalCountAC>
    | ReturnType<typeof setPacksPageAC>
    | ReturnType<typeof changePackTitleAC>
    | ReturnType<typeof removePackAC>
    | ReturnType<typeof sortPacks>