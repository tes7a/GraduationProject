import {Dispatch} from "redux";
import {PackDataType, PacksAPI} from "../../api/packsAPI";
import {setStatusAppAC} from "../../app/app-reducer";

let initialState: PacksReducerStateType = {
    packs: []
}

export const PacksReducer = (state: PacksReducerStateType = initialState, action: PacksReducerActionType) => {
    switch (action.type) {
        case "packs/GET-PACKS":
            return {...state, packs: action.packs}
        default:
            return state;
    }
}

//Actions
const getPacksAC = (packs: Array<PackDataType>) => ({type: 'packs/GET-PACKS', packs} as const);

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
//Types
type PacksReducerStateType = {
    packs: Array<PackDataType>
}
type PacksReducerActionType = ReturnType<typeof getPacksAC>;