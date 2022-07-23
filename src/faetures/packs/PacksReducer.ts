import {setAppErrorAC, setStatusAppAC} from '../../app/app-reducer';
import {Dispatch} from "redux";
import {defaultPacksPageCount, GetDateType, PackDataType, packsAPI, PacksDataType} from "../../api/packsAPI";
import {AppRootStateType, ThunkActionType} from "../../app/store";

let initialState: PacksReducerStateType = {
    packs: [],
    setting: {
        packsNames: '',
        showMyPacks: false,
        totalCount: 0,
        pageCount: defaultPacksPageCount,
        page: 1,
        sortMethod: undefined,
        minCardsCount: 0,
        maxCardsCount: 0,
    }
};

export const PacksReducer = (state: PacksReducerStateType = initialState, action: PacksReducerActionsType) => {
    switch (action.type) {
        case "packs/GET-PACKS":
            return {...state, packs: action.packs};
        case "packs/CHANGE-PACK-TITLE":
            return {...state, packs: state.packs.map(p => p._id === action.id ? {...p, name: action.name} : p)};
        case "setting/SET-TOTAL-COUNT":
            return {...state, setting: {...state.setting, totalCount: action.totalCount}};
        case "setting/SET-PAGE-COUNT":
            return {...state, setting: {...state.setting, pageCount: action.pageCount}};
        case "setting/SET-PAGE":
            return {...state, setting: {...state.setting, page: action.page}};
        case "setting/SET-MIN-MAX-CARDS-COUNT":
            return {
                ...state,
                setting: {...state.setting, minCardsCount: action.minCardsCount, maxCardsCount: action.maxCardsCount}
            };
        case "setting/SORT-PACKS":
            return {...state, setting: {...state.setting, sortMethod: action.sortMethod}};
        case "setting/SET-SHOW-MY-PACKS":
            return {...state, setting: {...state.setting, showMyPacks: action.showMyPacks}};
        default:
            return state;
    }
}

//Actions
export const getPacksAC = (packs: Array<PackDataType>) => ({type: 'packs/GET-PACKS', packs} as const);
export const setPacksTotalCountAC = (totalCount: number) => ({type: 'setting/SET-TOTAL-COUNT', totalCount} as const);
export const setPacksPageCountAC = (pageCount: number) => ({type: 'setting/SET-PAGE-COUNT', pageCount} as const);
export const setPacksPageAC = (page: number) => ({type: 'setting/SET-PAGE', page} as const);
export const changePackTitleAC = (id: string, name: string) => ({type: 'packs/CHANGE-PACK-TITLE', id, name} as const);
export const setSortPacks = (sortMethod: string) => ({type: 'setting/SORT-PACKS', sortMethod} as const);
export const setMinMaxCardsCountsAC = (minCardsCount: number, maxCardsCount: number) => ({
    type: 'setting/SET-MIN-MAX-CARDS-COUNT',
    minCardsCount,
    maxCardsCount
} as const);
export const setShowMyPacksAC = (showMyPacks: boolean) => ({type: 'setting/SET-SHOW-MY-PACKS', showMyPacks} as const);
export const setPacksNamesAC = (packsNames: string | undefined) => ({
    type: 'setting/SET-PACK-NAMES',
    packsNames
} as const);

//Thunks
export const getPacksTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const showMyPacks = getState().packs.setting.showMyPacks;
    const newData: GetDateType = {
        packName: getState().searchPack.packName,
        id: showMyPacks ? getState().auth.user._id : '',
        pageCount: getState().packs.setting.pageCount,
        page: getState().packs.setting.page,
        sortType: getState().packs.setting.sortMethod,
        min: getState().searchPack.minCardsCount,
        max: getState().searchPack.maxCardsCount
    }

    dispatch(setStatusAppAC('loading'));
    packsAPI.getPacks(newData)
        .then(res => {
            console.log(res);
            dispatch(setPacksNamesAC(newData.packName));
            dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount));
            dispatch(setMinMaxCardsCountsAC(res.data.minCardsCount, res.data.maxCardsCount));
            dispatch(getPacksAC(res.data.cardPacks));
            dispatch(setAppErrorAC(''));
            dispatch(setStatusAppAC('succeeded'));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setAppErrorAC(error));
            dispatch(setStatusAppAC('failed'));
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'));
        })
}
export const createPackTC = (value: string, isPrivate: boolean): ThunkActionType =>
    (dispatch,getState:() => AppRootStateType) => {
        dispatch(setStatusAppAC('loading'));
        packsAPI.addPack(value, isPrivate)
            .then(res => {
                dispatch(setSortPacks('0updated'));
                dispatch(setPacksPageAC(1));
                dispatch(getPacksTC());
                dispatch(setAppErrorAC(''));
                dispatch(setStatusAppAC('succeeded'));
            }).catch(e => {
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setAppErrorAC(error));
            dispatch(setStatusAppAC('failed'));
        })
            .finally(() => {
                dispatch(setStatusAppAC('idle'));
            })

    }

export const changePackTitleTC = (id: string, name: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    packsAPI.changePack(id, name)
        .then(res => {
            dispatch(changePackTitleAC(id, name));
            dispatch(setAppErrorAC(''));
            dispatch(setStatusAppAC('succeeded'));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setAppErrorAC(error));
            dispatch(setStatusAppAC('failed'));
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'));
        })

}

export const removePackTC = (id: string): ThunkActionType =>
    (dispatch) => {
        dispatch(setStatusAppAC('loading'));
        packsAPI.removePack(id)
            .then(res => {
                dispatch(getPacksTC());
                dispatch(setAppErrorAC(''));
                dispatch(setStatusAppAC('succeeded'));
            })
            .catch(e => {
                const error = e.response ? e.response.data.error : e.message + ' more details in the console';
                dispatch(setAppErrorAC(error));
                dispatch(setStatusAppAC('failed'));
            })
            .finally(() => {
                dispatch(setStatusAppAC('idle'));
            })
    }


//Types
export type PacksReducerStateType = {
    packs: Array<PackDataType>
    setting: SettingPacksType
}

export type SettingPacksType = {
    packsNames: string | undefined
    showMyPacks: boolean
    totalCount: number
    pageCount: number
    page: number
    sortMethod: string | undefined
    minCardsCount: number
    maxCardsCount: number
}
export type PacksReducerActionsType = ReturnType<typeof getPacksAC>
    | ReturnType<typeof setPacksTotalCountAC>
    | ReturnType<typeof setPacksPageAC>
    | ReturnType<typeof changePackTitleAC>
    | ReturnType<typeof setSortPacks>
    | ReturnType<typeof setPacksPageCountAC>
    | ReturnType<typeof setShowMyPacksAC>
    | ReturnType<typeof setMinMaxCardsCountsAC>;

