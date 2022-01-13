import {forgotPasswordAPI} from "./forgot-password-api";

export const initialRecoveryPasswordState = {
    status: "idle",
};

export const forgotPasswordReducer = (state:initialRecoveryPasswordStateType = initialRecoveryPasswordState, action: ActionsTypeReducer): initialRecoveryPasswordStateType => {
    switch (action.type) {
        case "PASSWORD-RECOVERY/SET-STATUS":
            return {...state, status: action.status};
        default:
            return state
    }
};

//action
const setStatusAC = (status: RequestStatusType) => ({type: "PASSWORD-RECOVERY/SET-STATUS", status} as const);

//thunk
export const createForgotPasswordRequestTC = (data: DataRecoveryPasswordType) => (dispatch: any) => {
    forgotPasswordAPI.createForgotPasswordRequest(data)
        // .then(res => {
        //
        // })
        // .catch(error => {
        //
        // })
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
