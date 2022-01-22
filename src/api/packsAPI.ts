import {instance} from "./authAPI";
import {AxiosResponse} from "axios";

export const PacksAPI = {
    getPacks(date:GetDateType) {
        const page = date && date.currentPage ? date.currentPage : 1;
        const pageCount = date && date.pageCount ?  date.pageCount : defaultPacksPageCount;
        const id = date && date.id ? date.id : '';
        return instance.get<PacksDataType, AxiosResponse<PacksDataType>>(
            `/cards/pack?user_id=${id}&pageCount=${pageCount}&page=${page}`
        );
    },
    addPack(name: string) {
        return instance.post<ResponseForAddedPackDate, AxiosResponse<ResponseForAddedPackDate>>("/cards/pack", {
            cardsPack: {
                name
            }
        })
    },
    changePack(id: string, name: string) {
        return instance.put<any>("/cards/pack", {
            cardsPack: {
                _id: id,
                name
            }
        })
    },
    removePack(id: string) {
        return instance.delete<ResponseForDeletedPackDate, AxiosResponse<ResponseForDeletedPackDate>>(`/cards/pack?id=${id}`);
    }
}

//Types
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
export type ResponseForAddedPackDate = {
    newCardsPack: PackDataType
    token: string
    tokenDeathTime: number
}
export type ResponseForDeletedPackDate ={
    deletedCardsPack: PackDataType
    token: string
    tokenDeathTime: number
}
export type GetDateType = {
    id?:string
    currentPage?:number
    pageCount?:number
}

//date
export const defaultPacksPageCount = 10;
