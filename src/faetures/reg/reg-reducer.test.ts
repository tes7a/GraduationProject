import {RegReducer, RegStateType, setErrRequest, toggleIsRegistration} from './reg-reducer';

describe('Checking reg reducer actions', () => {
    let initialState: RegStateType;
    beforeEach(() => {
        initialState = {
            toggleRegistration: false,
            errMsg: '',
        }
    });
    it('Toggle is registration', () => {
         const reducer = RegReducer(initialState,toggleIsRegistration(true));
         expect(reducer.toggleRegistration).toBe(true);
    });

   it('Setting error', () => {
      const reducer = RegReducer(initialState,setErrRequest('Some error!'));
      expect(reducer.errMsg).toBe('Some error!');
   });
});