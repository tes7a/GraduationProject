import axios, {AxiosResponse} from 'axios';
import {cardsAPI, CardsResp} from './cardsAPI';

const getCardsResolved: CardsResp = {
    cards: [
        {
            answer: 'no answer',
            cardsPack_id: '62d2a43c2cc4cb00046b1cd0',
            comments: '',
            created: '2022-07-18T21:03:31.288Z',
            grade: 0,
            more_id: '6267b5e97120840004ab3366',
            question: 'no question',
            rating: 0,
            shots: 0,
            type: 'card',
            updated: '2022-07-18T21:03:31.288Z',
            user_id: '6267b5e97120840004ab3366',
            __v: 0,
            _id: '62d5caa3c2c4dd0004287ec1',
        }
    ],
    cardsTotalCount: 3,
    maxGrade: 6,
    minGrade: 0,
    packUserId: '123',
    page: 1,
    pageCount: 10,
}

jest.mock('axios');
describe('Testing cards API', () => {
    let getCardsData: AxiosResponse<CardsResp>;
    beforeEach(() => {
        getCardsData = {...getCardsData, data: getCardsResolved};
    });

    it('Getting cards', async () => {
        jest.spyOn(cardsAPI, 'getCards').mockResolvedValue(getCardsData);
        const res = await cardsAPI.getCards({});
        expect(res.data.cards.length).toBe(1);
        expect(res.data.cardsTotalCount).toBe(3);
        expect(res.data.packUserId).toBe('123');
    });
});