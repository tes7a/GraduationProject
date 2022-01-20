import { Dispatch } from "redux";
import {searchAPI} from "./search-api";

let initialState = {
    cards: [
        {
            answer: "answer",
            question: "question",
            cardsPack_id: "1eb6a2f72f849402d46c6ac4",
            grade: 1.987525071790364,
            rating: 4,
            shots: 1,
            type: "card",
            user_id: "142151531535151",
            created: "2020-04-13T11:05:44.867Z",
            updated: "2020-05-13T11:05:44.867Z",
            __v: 0,
            _id: "5ebbd48876810f1ad0e7ece3"
        },
        {
            answer: "no answer",
            question: "no question",
            cardsPack_id: "2eb6a2f72f849402d46c6ac4",
            grade: 2.987525071790364,
            rating: 3,
            shots: 1,
            type: "card",
            user_id: "242151531535151",
            created: "2021-03-13T11:05:44.867Z",
            updated: "2021-04-13T11:05:44.867Z",
            __v: 0,
            _id: "5ebbd48876810f1ad0e7ece3"
        },
        {
            answer: "no answer",
            question: "question1",
            cardsPack_id: "3eb6a2f72f849402d46c6ac4",
            grade: 3.987525071790364,
            rating: 0,
            shots: 1,
            type: "card",
            user_id: "342151531535151",
            created: "2022-01-13T11:05:44.867Z",
            updated: "2022-01-13T11:05:44.867Z",
            __v: 0,
            _id: "5ebbd48876810f1ad0e7ece3"
        },
        {
            answer: "no answer",
            question: "question2",
            cardsPack_id: "4eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            rating: 4,
            shots: 1,
            type: "card",
            user_id: "442151531535151",
            created: "2020-06-13T11:05:44.867Z",
            updated: "2020-07-13T11:05:44.867Z",
            __v: 0,
            _id: "5ebbd48876810f1ad0e7ece3"
        },
        {
            answer: "no answer",
            question: "question3",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 5.987525071790364,
            rating: 0,
            shots: 1,
            type: "card",
            user_id: "542151531535151",
            created: "2021-08-13T11:05:44.867Z",
            updated: "2021-08-13T11:05:44.867Z",
            __v: 0,
            _id: "5ebbd48876810f1ad0e7ece3"
        },
        {
            answer: "no answer",
            question: "question4",
            cardsPack_id: "6eb6a2f72f849402d46c6ac4",
            grade: 6.987525071790364,
            rating: 5,
            shots: 1,
            type: "card",
            user_id: "642151531535151",
            created: "2020-02-13T11:05:44.867Z",
            updated: "2020-03-13T11:05:44.867Z",
            __v: 0,
            _id: "5ebbd48876810f1ad0e7ece3"
        },
    ] as CardType[],
    cardsTotalCount: 6,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: "5eecf82a3ed8f700042f1186"
};

export type InitialStateType = typeof initialState;

export const searchReducer = (state: InitialStateType = initialState, action: SearchReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-FIND-CARDS":
            return {...state, cards: action.cards};
        default:
            return state;
    }
};

//actions
export const setFoundCardsAC = (cards: CardType[]) => ({type: "SET-FIND-CARDS", cards});


//thunks
export const searchCards = (text: any) => (dispatch: ThunkDispatch) => {
    searchAPI.searchCards(text)
        .then(response => {
            dispatch(setFoundCardsAC(response.data.cards));
        })
        .catch(error => {
            return "some error"
        });
};

export type ResponseGetCardsType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}



export type setFoundCardsType = ReturnType<typeof setFoundCardsAC>;
export type SearchReducerActionsType = setFoundCardsType
type ThunkDispatch = Dispatch<SearchReducerActionsType>
