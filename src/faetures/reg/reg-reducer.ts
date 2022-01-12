import {stat} from "fs";

type StateType = any;

const initialStateReg: StateType = {
}

export const RegReducer = (state = initialStateReg, action: ActionsTypeReducer) => {
    switch (action.type) {
        default:
            return state
    }
}

// actionCreator


// thunk

// type

type ActionsTypeReducer = any;