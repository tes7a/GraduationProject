import {
    CardsReducers, gradeCard,
    gradeCards,
    initialCardsStateType,
    setCards, setCardsCountOnPage,
    setCardsPage,
    setCardsTotalCount, setCurrentCardsPackID, setGrade, setMinMaxGrade, setSortCards
} from './cards-reducer';
import {Card, CardsResp} from '../../api/cardsAPI';

const initialCards: Card[] = [
    {
        answer: '2',
        cardsPack_id: '1',
        created: '2022-07-12T13:00:56.854Z',
        grade: 0,
        question: '1',
        rating: 0,
        shots: 0,
        type: 'card',
        updated: '2022-07-12T13:00:56.854Z',
        user_id: '62b8666a4b58c33884fab3f5',
        __v: 0,
        _id: '62cd70884899f500048163ff'
    },
    {
        answer: '4',
        cardsPack_id: '2',
        created: '2022-07-12T13:00:56.854Z',
        grade: 0,
        question: '3',
        rating: 0,
        shots: 0,
        type: 'card',
        updated: '2022-07-12T13:00:56.854Z',
        user_id: '62b8666a4b58c33884fab3f5',
        __v: 0,
        _id: '62cd70884899f500048163ff'
    },
];

describe('Card reducer actions should work correct', () => {
    let initialState: initialCardsStateType;
    let cards: CardsResp;
    beforeEach(() => {
        initialState = {
            cards: [
                {
                    answer: '2',
                    cardsPack_id: '5',
                    created: '2022-07-12T13:00:56.854Z',
                    grade: 0,
                    question: '1',
                    rating: 0,
                    shots: 0,
                    type: 'card',
                    updated: '2022-07-12T13:00:56.854Z',
                    user_id: '62b8666a4b58c33884fab3f5',
                    __v: 0,
                    _id: '62cd70884899f500048163ff'
                },
            ],
            page: 1,
            pageCount: 10,
            cardsTotalCount: 10,
            maxGrade: 0,
            minGrade: 0,
            packUserId: '',
            totalCount: 0,
            currentCardsPackID: '',
            sortCardsMethod: undefined,
            currentGrade: [0, 0],
            countPerPage: [10, 25, 50]
        };
        cards = {
            cards: initialCards,
            cardsTotalCount: 10,
            maxGrade: 6,
            minGrade: 0,
            page: 1,
            pageCount: 10,
            packUserId: '62b8666a4b58c33884fab3f5'
        }
    });

    it('Setting cards', () => {
        const reducer = CardsReducers(initialState, setCards(cards));
        expect(reducer.cards).toEqual(initialCards);
        expect(reducer.cards.length).toBe(2);
    });

    it('Setting cards total count', () => {
        const reducer = CardsReducers(initialState, setCardsTotalCount(15));
        expect(reducer.totalCount).toBe(15);
    });

    it('Setting cards page', () => {
        const reducer = CardsReducers(initialState, setCardsPage(2));
        expect(reducer.page).toBe(2);
    });

    it('Setting current cards pack id', () => {
        const reducer = CardsReducers(initialState, setCurrentCardsPackID('3'));
        expect(reducer.currentCardsPackID).toBe('3');
    });

    it('Setting cards count on page', () => {
        const reducer = CardsReducers(initialState, setCardsCountOnPage(5));
        expect(reducer.page).toBe(5);
    });

    it('Setting min and max grade', () => {
        const reducer = CardsReducers(initialState, setMinMaxGrade([2, 3]));
        expect(reducer.minGrade).toBe(2);
        expect(reducer.maxGrade).toBe(3);
    });

    it('Sort cards', () => {
        const reducer = CardsReducers(initialState, setSortCards('top'));
        expect(reducer.sortCardsMethod).toBe('top');
    });

    it('Setting current grade', () => {
        const reducer = CardsReducers(initialState, setGrade([1, 2]));
        expect(reducer.currentGrade).toEqual([1, 2]);
    });

    it('Updating grade', () => {
        const reducer = CardsReducers(initialState, gradeCard('5', 4));
        expect(reducer.cards.length).toBe(1);
        const card = reducer.cards.find(c => c.cardsPack_id === '5') as Card;
        expect(card.grade).toBe(4)
    });
});