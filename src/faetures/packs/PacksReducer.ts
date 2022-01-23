import {setStatusAppAC} from './../../app/app-reducer';
import {Dispatch} from "redux";
import {GetDateType, PackDataType, PacksAPI} from "../../api/packsAPI";
import {ThunkAction} from "redux-thunk";
import {AppRootActionsType, AppRootStateType, ThunkActionType} from "../../app/store";

let initialState: PacksReducerStateType = {
    packs: [],
    totalCount: 0,
    page: 1,
    maxCardsCount: 0,
    minCardsCount: 0,
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
        default:
            return state;
    }
}

//Actions
export const getPacksAC = (packs: Array<PackDataType>) => ({type: 'packs/GET-PACKS', packs} as const);
const setPacksTotalCountAC = (totalCount: number) => ({type: 'packs/SET-TOTAL-COUNT', totalCount} as const);
export const setPacksPageAC = (page: number) => ({type: 'packs/SET-PAGE', page} as const);
const addPackAC = (pack: PackDataType) => ({type: 'packs/ADD-PACK', pack} as const);
const changePackTitleAC = (id: string, name: string) => ({type: 'packs/CHANGE-PACK-TITLE', id, name} as const);
const removePackAC = (id: string) => ({type: 'packs/REMOVE-PACK', id} as const);

//Thunks
export const getPacksTC = (date: GetDateType) => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    PacksAPI.getPacks(date)
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

export const createPackTC = (value: string, showMyPacksPage: boolean, userID?: string): ThunkActionType =>
    (dispatch) => {
        dispatch(setStatusAppAC('loading'));
        PacksAPI.addPack(value)
            .then(res => {
                // dispatch(addPackAC(res.data.newCardsPack));
                if (showMyPacksPage) {
                    dispatch(getPacksTC({id: userID, currentPage: 1}));
                } else {
                    dispatch(getPacksTC({currentPage: 1}));
                }
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

export const removePackTC = (id: string, currentPage: number, showMyPacksPage: boolean, userID?: string): ThunkActionType =>
    (dispatch) => {
        dispatch(setStatusAppAC('loading'));
        PacksAPI.removePack(id)
            .then(res => {
                if (showMyPacksPage) {
                    dispatch(getPacksTC({id: userID, currentPage}));
                } else {
                    dispatch(getPacksTC({currentPage}));
                }
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
    maxCardsCount: number
    minCardsCount: number
}
export type PacksReducerActionsType = ReturnType<typeof getPacksAC>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof setPacksTotalCountAC>
    | ReturnType<typeof setPacksPageAC>
    | ReturnType<typeof changePackTitleAC>
    | ReturnType<typeof removePackAC>;

