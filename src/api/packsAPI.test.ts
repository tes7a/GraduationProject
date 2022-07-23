import axios, {AxiosResponse} from 'axios';
import {PackDataType, packsAPI, PacksDataType, ResponseForAddedPackDate, ResponseForDeletedPackDate} from './packsAPI';

const getData = {
    cardPacks: [
        {
            cardsCount: 0,
            created: '2022-07-23T12:17:54.582Z',
            grade: 0,
            more_id: '624b04b587b7af66e40a1112',
            name: 'Alex',
            path: '/def',
            private: false,
            rating: 0,
            shots: 0,
            type: 'pack',
            updated: '2022-07-23T12:17:54.582Z',
            user_id: '624b04b587b7af66e40a1112',
            user_name: 'Anton Avtoritetov',
            __v: 0,
            _id: '62dbe6f23a76cc00040c375f'
        },
        {
            cardsCount: 1,
            created: '2022-07-11T11:07:42.250Z',
            deckCover: null,
            grade: 0,
            more_id: '61b4d36d62c36e00044d56f9',
            name: 'no Name1',
            path: '/def',
            private: false,
            rating: 0,
            shots: 0,
            type: 'pack',
            updated: '2022-07-23T08:25:53.653Z',
            user_id: '61b4d36d62c36e00044d56f9',
            user_name: 'Aleks',
            __v: 0,
            _id: '62cc047e552f730004b822f8'
        }
    ],
    cardPacksTotalCount: 10,
    maxCardsCount: 5,
    minCardsCount: 2,
    page: 1,
    pageCount: 1,
    token: 'token123',
    tokenDeathTime: 123,
    sortPacks: '123'
};
const addData = {
    newCardsPack: {
        cardsCount: 10,
        created: '1235',
        grade: 1,
        more_id: 'idasd',
        name: 'newPack',
        path: '/def',
        private: false,
        rating: 2,
        shots: 3,
        type: 'pack',
        updated: '1234561',
        user_id: 'userID',
        user_name: 'userName',
        __v: 5,
        _id: '_idaasd'
    },
    token: 'kakkask',
    tokenDeathTime: 4
};
const removeData = {
    deletedCardsPack: {
        cardsCount: 10,
        created: '1235',
        grade: 1,
        more_id: 'idasd',
        name: 'newPack',
        path: '/def',
        private: false,
        rating: 2,
        shots: 3,
        type: 'pack',
        updated: '1234561',
        user_id: 'userID',
        user_name: 'userName',
        __v: 5,
        _id: '42'
    },
    token: 'token',
    tokenDeathTime: 5
};

jest.mock('axios');
describe('Testing packs API', () => {
    let getResolve: AxiosResponse<PacksDataType>;
    let addResolve: AxiosResponse<ResponseForAddedPackDate>;
    let removeResolve: AxiosResponse<ResponseForDeletedPackDate>;
    beforeEach(() => {
        getResolve = {...getResolve, data: getData};
        addResolve = {...addResolve, data: addData};
        removeResolve = {...removeResolve, data: removeData}
    });
    it('Getting packs', async () => {
        jest.spyOn(packsAPI, 'getPacks').mockResolvedValue(getResolve);
        const res = await packsAPI.getPacks({});
        expect(res.data.page).toBe(1);
    });

    it('Adding pack', async () => {
        jest.spyOn(packsAPI, 'addPack').mockResolvedValue(addResolve);
        const res = await packsAPI.addPack('pack', false);
        expect(res.data.newCardsPack.name).toBe('newPack');
    });

    it('Change pack', async () => {
        jest.spyOn(packsAPI, 'changePack').mockResolvedValue(addResolve);
        const res = await packsAPI.changePack('packID', 'packName');
        expect(res.data.newCardsPack.name).toBe('newPack');
    });

    it('Removing pack', async () => {
        jest.spyOn(packsAPI, 'removePack').mockResolvedValue(removeResolve);
        const res = await packsAPI.removePack('packID');
        expect(res.data.deletedCardsPack.user_id).toBe('userID');
    });
});