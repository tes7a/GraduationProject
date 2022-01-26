import axios, {AxiosResponse} from "axios";
import {PackType, ResponseGetPacksType} from "./search-pack-reducer";
import {ResponseGetCardsType} from "./search-reducer";


const instance = axios.create({
    // baseURL: "https://neko-back.herokuapp.com/2.0",
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
});

export const searchAPI = {
    searchCards(question: string) {
        return instance.get<ResponseGetCardsType, AxiosResponse<ResponseGetCardsType>>(`cards/card?cardAnswer=${question}`);
    },
    searchPacks(data: PackType) {
        const packName = data && data.packName ? data.packName : '';
        const min = data && data.min ? data.min : 0;
        const max = data && data.max ? data.max : 0;
        return instance.get<ResponseGetPacksType, AxiosResponse<ResponseGetPacksType>>(`cards/pack?packName=${packName}&min=${min}&max=${max}`);
    }
};