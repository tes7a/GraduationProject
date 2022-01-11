import {recoveryPasswordAPI} from "./password-recovery-api";

export const initialRecoveryPasswordState = {
    status: "idle",
};

export const passwordRecoveryReducer = (state:initialRecoveryPasswordStateType = initialRecoveryPasswordState, action: ActionsTypeReducer): initialRecoveryPasswordStateType => {
    switch (action.type) {
        case "PASSWORD-RECOVERY/SET-STATUS":
            return {...state, status: action.status};
        default:
            return state
    }
};

//action
// const createRequestRecoveryPasswordAC = (data: DataRecoveryPasswordType) => ({type: "PASSWORD-RECOVERY/CREATE-REQUEST-RECOVERY-PASSWORD"} as const);
const setStatusAC = (status: RequestStatusType) => ({type: "PASSWORD-RECOVERY/SET-STATUS", status} as const);

//thunk
export const createRequestRecoveryPasswordTC = (data: DataRecoveryPasswordType) => (dispatch: any) => {
    recoveryPasswordAPI.createRequestRecoveryPassword(data)
        .then(res => {

        })
        .catch(error => {

        })
};


//type
type initialRecoveryPasswordStateType = typeof initialRecoveryPasswordState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type DataRecoveryPasswordType = {
    email: string,
    from?: string,
    message: string
}

export type setStatusType = ReturnType<typeof setStatusAC>

type ActionsTypeReducer = setStatusType
