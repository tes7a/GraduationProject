const initialStateApp: initialStateAppType = {
    status: 'idle'
}

export const AppReducer = (state: initialStateAppType = initialStateApp, action: ActionsTypeReducer): initialStateAppType => {
    switch (action.type) {
        case "app/SET-STATUS":
            return {...state, status: action.status};
        default:
            return state
    }
}

// action
export const setStatusAppAC = (status: RequestStatusType) => ({type: 'app/SET-STATUS', status} as const);
// thunk

// type

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
type initialStateAppType = {
    status: RequestStatusType
}
type ActionsTypeReducer = ReturnType<typeof setStatusAppAC>;