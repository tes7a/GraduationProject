import {setStatusAppAC} from './../../app/app-reducer';
import {Dispatch} from "redux";
import {PackDataType, PacksAPI} from "../../api/packsAPI";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootActionsType, AppRootStateType} from "../../app/store";

let initialState: PacksReducerStateType = {
    packs: []
}

export const PacksReducer = (state: PacksReducerStateType = initialState, action: PacksReducerActionsType) => {
    switch (action.type) {
        case "packs/GET-PACKS":
            return {...state, packs: action.packs};
        case "packs/CHANGE-PACK-TITLE":
            return {...state, packs: state.packs.map(p => p._id === action.id ? {...p, name: action.name} : p)};
        default:
            return state;
    }
}

//Actions
const getPacksAC = (packs: Array<PackDataType>) => ({type: 'packs/GET-PACKS', packs} as const);
const addPackAC = (pack: PackDataType) => ({type: 'packs/ADD-PACK', pack} as const);
const changePackTitleAC = (id: string, name: string) => ({type: 'packs/CHANGE-PACK-TITLE', id, name} as const);
const removePackAC = (id: string) => ({type: 'packs/REMOVE-PACK', id} as const);

//Thunks
export const getPacksTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    PacksAPI.getPacks()
        .then(res => {
            dispatch(getPacksAC(res.data.cardPacks));
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
            dispatch(getPacksTC());
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

export const removePackTC = (id: string):ThunkAction<void, AppRootStateType, unknown, AppRootActionsType> => (dispatch) => {
    dispatch(setStatusAppAC('loading'));
    PacksAPI.removePack(id)
        .then(res => {
            dispatch(getPacksTC());
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
}
export type PacksReducerActionsType = ReturnType<typeof getPacksAC>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof changePackTitleAC>
    | ReturnType<typeof removePackAC>;