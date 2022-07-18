import {AppReducer, initialStateAppType, setAppErrorAC, setInitialized, setStatusAppAC} from './app-reducer';


describe('appReducer should works correct', () => {
    let initialState: initialStateAppType;
    beforeEach(() => {
        initialState = {
            status: 'idle',
            error: '',
            isInitialized: false
        }
    });

    it('Setting app status', () => {
        const reducer = AppReducer(initialState,setStatusAppAC('succeeded'));
        expect(reducer.status).toBe('succeeded')
    });

    it('Initialization', () => {
        const reducer = AppReducer(initialState,setInitialized(true));
        expect(reducer.isInitialized).toBe(true)
    });

    it('Setting app error', () => {
        const reducer = AppReducer(initialState,setAppErrorAC('Some error!'));
        expect(reducer.error).toBe('Some error!')
    });
});

