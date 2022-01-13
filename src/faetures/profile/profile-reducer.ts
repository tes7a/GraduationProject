import {authAPI, UserDataInfo } from "../../api/authAPI";

const initialStateProfile: any = {
    data: null
}

export const ProfileReducer = (state = initialStateProfile, action: ActionsTypeReducer):any => {
    switch (action.type) {
        case "profile/TAKE-PROFILE-INFO":
            return {...state, data: action.data}
        default:
            return state
    }
}

// action
const takeProfileInfo = (data: UserDataInfo) => ({type: 'profile/TAKE-PROFILE-INFO',data}as const);

// thunk

export const ProfileInfo = () => () => {
    authAPI.checkUserInfo()
        .then(res => {
            takeProfileInfo(res.data)
        })

}

// type
type ActionsTypeReducer = | ReturnType<typeof takeProfileInfo>
type initialStateProfile = {
    data: UserDataInfo | null
}