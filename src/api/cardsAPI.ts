import {instance} from "./authAPI";
import {AxiosResponse} from "axios";

export const CardsAPI = {
    getCards() {
        return instance.get<CardsPacksDataType, AxiosResponse<CardsPacksDataType>>(`/cards/pack`);
    }
}

export type CardsPacksDataType = {
    cardPacks: Array<CardPackDataType>,
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardPackDataType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}