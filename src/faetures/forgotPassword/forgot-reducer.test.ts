import {
    forgotPasswordReducer,
    initialForgotPasswordStateType, setForgotPasswordErrorAC,
    setIsCreateForgotPasswordRequestAC,
    setStatusAC
} from './forgot-password-reducer';

describe('Check forgot reducer actions', () => {
    let initialState: initialForgotPasswordStateType;
    beforeEach(() => {
        initialState = {
            status: 'idle',
            isCreateForgotPasswordRequest: false,
            error: ''
        }
    });

    it('Setting status', () => {
        const reducer = forgotPasswordReducer(initialState, setStatusAC('succeeded'));
        expect(reducer.status).toBe('succeeded');
    });

    it('Create forgot password request', () => {
        const reducer = forgotPasswordReducer(initialState, setIsCreateForgotPasswordRequestAC(true));
        expect(reducer.isCreateForgotPasswordRequest).toBe(true);
    });

    it('Setting error', () => {
        const reducer = forgotPasswordReducer(initialState, setForgotPasswordErrorAC('Some error!'));
        expect(reducer.error).toBe('Some error!');
    });
})