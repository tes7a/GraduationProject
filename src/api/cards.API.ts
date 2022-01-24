import axios from "axios";
import { instance } from "./authAPI";

//dal
export const CardsAPI = {
    getCards(data?: GetDataType) {
       return instance.get<CardsResp>('/cards/card', {data: data})
    },
    deleteCard(data: DeleteDataType) {
        return instance.delete<Card>('/cards/card', {data: data})
    }
}

//type
export type CardsResp = {
    cards: Card[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type Card = {
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

export type GetDataType = {
    cardAnswer?:string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type DeleteDataType = {
    id: string
}