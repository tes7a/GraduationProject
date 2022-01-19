import {instance} from "./authAPI";
import {AxiosResponse} from "axios";

export const PacksAPI = {
    getPacks() {
        return instance.get<PacksDataType, AxiosResponse<PacksDataType>>(`/cards/pack`);
    },
    addPack(name: string) {
        return instance.post<any>("/cards/pack", {
            cardsPack: {
                name
            }
        })
    },
    changePack(id: string, name: string) {
        return instance.put<any>("/cards/pack",{
            cardsPack: {
                _id: id,
                name
            }
        })
    },
}

export type PacksDataType = {
    cardPacks: Array<PackDataType>,
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type PackDataType = {
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