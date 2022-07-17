import {
    searchPackReducer,
    SearchPackStateType,
    setSoughtMinMaxCountCardsAC,
    setSoughtPackNameAC
} from './search-pack-reducer';

describe('Search pack reducer actions', () => {
    let initialState: SearchPackStateType;
    beforeEach(() => {
        initialState = {
            maxCardsCount: 0,
            minCardsCount: 0,
            packName: ''
        };
    });

    it('Setting sought pack name',()=>{
       const reducer = searchPackReducer(initialState,setSoughtPackNameAC('Any name!'));
       expect(reducer.packName).toBe('Any name!');
    });

    it('Setting sought min & max count cards',()=>{
        const reducer = searchPackReducer(initialState,setSoughtMinMaxCountCardsAC([2,5]));
        expect(reducer.minCardsCount).toBe(2);
        expect(reducer.maxCardsCount).toBe(5);
    });
});