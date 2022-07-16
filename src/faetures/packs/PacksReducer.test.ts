import {
    changePackTitleAC,
    getPacksAC,
    PacksReducer,
    PacksReducerStateType,
    setMinMaxCardsCountsAC,
    setPacksPageAC,
    setPacksPageCountAC,
    setPacksTotalCountAC,
    setSortPacks
} from './PacksReducer';
import {defaultPacksPageCount, PackDataType} from '../../api/packsAPI';

const initialPacks:Array<PackDataType> = [
    {
        cardsCount: 3,
        created: '2022-07-14T15:09:50.460Z',
        grade: 0,
        more_id: '62b77a5978098119149df42f',
        name: 'React / Redux / TS',
        path: '/def',
        private: false,
        rating: 0,
        shots: 0,
        type: 'pack',
        updated: '2022-07-15T19:22:25.069Z',
        user_id: 'user_id2',
        user_name: 'asd asd',
        __v: 0,
        _id: '2'
    },
    {
        cardsCount: 3,
        created: '2022-07-14T15:09:50.460Z',
        grade: 0,
        more_id: '62b77a5978098119149df42f',
        name: 'React / Redux / TS',
        path: '/def',
        private: false,
        rating: 0,
        shots: 0,
        type: 'pack',
        updated: '2022-07-15T19:22:25.069Z',
        user_id: 'user_id3',
        user_name: 'ABCDF!',
        __v: 0,
        _id: '3'
    }
]

describe('Checking packs reducer`s actions', () => {
    let initialState: PacksReducerStateType;
    beforeEach(() => {
        initialState = {
            packs: [
                {
                    cardsCount: 3,
                    created: '2022-07-14T15:09:50.460Z',
                    grade: 0,
                    more_id: '62b77a5978098119149df42f',
                    name: 'React / Redux / TS',
                    path: '/def',
                    private: false,
                    rating: 0,
                    shots: 0,
                    type: 'pack',
                    updated: '2022-07-15T19:22:25.069Z',
                    user_id: 'user_id1',
                    user_name: 'Maxim Predko',
                    __v: 0,
                    _id: '1'
                }
            ],
            setting: {
                packsNames: '',
                showMyPacks: false,
                totalCount: 0,
                pageCount: defaultPacksPageCount,
                page: 1,
                sortMethod: undefined,
                minCardsCount: 0,
                maxCardsCount: 0,
            }
        }
    });

    it('Get packs', () => {
        const reducer = PacksReducer(initialState, getPacksAC(initialPacks));
        expect(reducer.packs).toEqual(initialPacks);
        expect(reducer.packs.length).toBe(2);
    });

    it('Change title', () => {
        const reducer = PacksReducer(initialState, changePackTitleAC('1','changed title'));
        expect(reducer.packs[0].name).toBe('changed title');
    });

    it('Setting packs total count', () => {
        const reducer = PacksReducer(initialState, setPacksTotalCountAC(20));
        expect(reducer.setting.totalCount).toBe(20);
    });

    it('Setting packs page count', () => {
        const reducer = PacksReducer(initialState, setPacksPageCountAC(30));
        expect(reducer.setting.pageCount).toBe(30);
    });

    it('Setting packs page', () => {
        const reducer = PacksReducer(initialState, setPacksPageAC(4));
        expect(reducer.setting.page).toBe(4);
    });

    it('Setting sort cards', () => {
        const reducer = PacksReducer(initialState, setSortPacks('Any sort!'));
        expect(reducer.setting.sortMethod).toBe('Any sort!');
    });

    it('Setting min & max cards count', () => {
        const reducer = PacksReducer(initialState, setMinMaxCardsCountsAC(5, 10));
        expect(reducer.setting.minCardsCount).toBe(5);
        expect(reducer.setting.maxCardsCount).toBe(10);
    });
});