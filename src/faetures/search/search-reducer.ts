let initialState = {
    cardQuestion: ""
};

export type InitialStateType = typeof initialState;

export const searchCardReducer = (state: InitialStateType = initialState, action: SearchCardReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "searchCard/SET-SOUGHT-QUESTION":
            return {...state, cardQuestion: action.cardQuestion};
        default:
            return state;
    }
};

//actions
export const setSoughtCardQuestionAC = (cardQuestion: string) => ({type: "searchCard/SET-SOUGHT-QUESTION", cardQuestion});


//types
export type setSoughtCardQuestionType = ReturnType<typeof setSoughtCardQuestionAC>;
export type SearchCardReducerActionsType = setSoughtCardQuestionType
