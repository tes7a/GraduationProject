import {registerApi, RegisterRequestType} from "../../api/registerApi";


type StateType = {
    toggleRegistration: boolean
    errMsg: string
};

const initialStateReg: StateType = {
    toggleRegistration: false,
    errMsg: '',
}

export const RegReducer = (state = initialStateReg, action: ActionsTypeReducer) => {
    switch (action.type) {
        case "TOGGLE_IS_REGISTRATION":
            return {...state, toggleRegistration: action.value}
        case "SET_ERR_REQUEST":
            return {...state, errMsg: action.value}
        default:
            return state
    }
}

// actionCreator
type ToggleIsRegistrationAT = {type: "TOGGLE_IS_REGISTRATION", value: boolean};
const toggleIsRegistration = (value: boolean) => ({type: "TOGGLE_IS_REGISTRATION", value});

type SetErrRequestAT = {type: "SET_ERR_REQUEST", value: boolean};
const setErrRequest = (value: string) => ({type: 'SET_ERR_REQUEST' , value});

// thunk

export const registerTC = (data: RegisterRequestType) => (dispatch: any) => {
    registerApi.register(data)
        .then(() => {
            dispatch(toggleIsRegistration(true))
        })
        .catch(e => {
            dispatch(setErrRequest(e.response.data.error))
        })
        .finally(() => {

    })
}

// type

type ActionsTypeReducer = ToggleIsRegistrationAT | SetErrRequestAT;