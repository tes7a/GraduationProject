import { newPasswordAPI } from "./new-password-api";

export const initialNewPasswordState = {
    status: "idle",
    isChangedPassword: false,
    error: ""
};

export const newPasswordReducer = (state:initialNewPasswordStateType = initialNewPasswordState, action: ActionsTypeReducer): initialNewPasswordStateType => {
    switch (action.type) {
        case "newPasswordReducer/SET-STATUS":
            return {...state, status: action.status};
        case 'newPasswordReducer/SET-IS-CHANGED-PASSWORD':
            return {...state, isChangedPassword: action.isChangedPassword};
        case 'newPasswordReducer/SET-ERROR':
            return {...state, error: action.error};
        default:
            return state
    }
};

//action
const setStatusAC = (status: RequestStatusType) => ({type: "newPasswordReducer/SET-STATUS", status} as const);
export const setIsChangedPasswordAC = (isChangedPassword: boolean) =>
    ({type: "newPasswordReducer/SET-IS-CHANGED-PASSWORD", isChangedPassword} as const);
export const setNewPasswordErrorAC = (error: string) => ({type: 'newPasswordReducer/SET-ERROR', error} as const);

//thunk
export const createNewPasswordTC = (data: any) => (dispatch: any) => {
    newPasswordAPI.createRequestRecoveryPassword(data)
        .then(res => {
            dispatch(setStatusAC('succeeded'));
        })
        .catch(error => {
            if (!error.response) {
                return "some error";
            }

            dispatch(setNewPasswordErrorAC(error.response.data.error));
        })
        .finally(() => {
            dispatch(setStatusAC('succeeded'));
        })
};


//type
type initialNewPasswordStateType = typeof initialNewPasswordState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type DataNewPasswordType = {
    password: string
    resetPasswordToken: string
}

export type setStatusType = ReturnType<typeof setStatusAC>
export type setIsChangedPasswordType = ReturnType<typeof setIsChangedPasswordAC>
export type setNewPasswordErrorType = ReturnType<typeof setNewPasswordErrorAC>

type ActionsTypeReducer = setStatusType
    | setIsChangedPasswordType
    | setNewPasswordErrorType
