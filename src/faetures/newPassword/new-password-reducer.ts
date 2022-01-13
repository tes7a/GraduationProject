import { newPasswordAPI } from "./new-password-api";

export const initialNewPasswordState = {
    status: "idle",
    isChangedPassword: false
};

export const newPasswordReducer = (state:initialNewPasswordStateType = initialNewPasswordState, action: ActionsTypeReducer): initialNewPasswordStateType => {
    switch (action.type) {
        case "newPasswordReducer/SET-STATUS":
            return {...state, status: action.status};
        // case 'newPasswordReducer/SET-IS-CHANGED-PASSWORD':
        //     return {...state, isChangedPassword: action.isChangedPassword};
        default:
            return state
    }
};

//action
const setStatusAC = (status: RequestStatusType) => ({type: "newPasswordReducer/SET-STATUS", status} as const);
export const setIsChangedPasswordAC = (isChangedPassword: boolean) =>
    ({type: "newPasswordReducer/SET-IS-CHANGED-PASSWORD", isChangedPassword} as const);

//thunk
export const createNewPasswordTC = (data: any) => (dispatch: any) => {
    newPasswordAPI.createRequestRecoveryPassword(data)
        // .then(res => {
        //     dispatch(setStatusAC('succeeded'));
        // })
        // .catch(error => {
        //
        // })
};


//type
type initialNewPasswordStateType = typeof initialNewPasswordState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type DataNewPasswordType = {
    password: string
    resetPasswordToken: string
}

export type setStatusType = ReturnType<typeof setStatusAC>

type ActionsTypeReducer = setStatusType
