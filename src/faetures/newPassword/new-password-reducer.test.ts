import {
    initialNewPasswordStateType,
    newPasswordReducer,
    setIsChangedPasswordAC, setNewPasswordErrorAC,
    setStatusAC
} from './new-password-reducer';

describe('Checking new password reducer actions', () => {
    let initialState: initialNewPasswordStateType;
    beforeEach(() => {
        initialState = {
            status: 'idle',
            isChangedPassword: false,
            error: ''
        }
    });

    it('Setting status', () => {
       const reducer = newPasswordReducer(initialState,setStatusAC('failed'));
       expect(reducer.status).toBe('failed');
    });

    it('Setting isChanged password', () => {
        let reducer = newPasswordReducer(initialState,setIsChangedPasswordAC(true));
        expect(reducer.isChangedPassword).toBe(true);
        reducer = newPasswordReducer(initialState,setIsChangedPasswordAC(false));
        expect(reducer.isChangedPassword).toBe(false);
    });

    it('Setting error', () => {
        const reducer = newPasswordReducer(initialState,setNewPasswordErrorAC('New password error!'));
        expect(reducer.error).toBe('New password error!');
    });
});