import {authAPI, UserAuthInfo} from "../../api/authAPI";
import a from "./ava.jpg"

export const SomeUser: UserAuthInfo = {
    _id: "0",
    email: "fake",
    name: "fake",
    avatar: a,
    publicCardPacksCount: 0,
    deviceTokens:[],
    tokenDeathTime: 42000,
    token: '',
    created: new Date().toJSON(),
    updated: new Date().toJSON(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
    __v: 1
};


type initialStateType = {
    user: UserAuthInfo | null
    isLoggedIn: boolean
}

const initialStateProfile: initialStateType = {
    isLoggedIn: false,
    
    user: null
}

export const ProfileReducer = (state = initialStateProfile, action: ActionsTypeReducer):initialStateType => {
    switch (action.type) {
        case "profile/TAKE-PROFILE-INFO":
            return {
                ...state,
                user: action.data
            }
        case "profile/IS-LOGGED-IN":
            return {
                ...state,
                isLoggedIn: action.status
            }
        default:
            return state
    }
}

// action
const takeProfileInfo = (data: UserAuthInfo) => ({type: 'profile/TAKE-PROFILE-INFO',data}as const);
const isLoggedIn = (status: boolean) => ({type: 'profile/IS-LOGGED-IN', status}as const)

// thunk

export const ProfileInfo = () => () => {
    authAPI.checkUserInfo()
        .then(res => {
            isLoggedIn(true)
            takeProfileInfo(res.data)
        })

}

// type
type ActionsTypeReducer = | ReturnType<typeof takeProfileInfo> | ReturnType<typeof isLoggedIn>
