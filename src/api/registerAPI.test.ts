import axios, {AxiosResponse} from 'axios';
import {registerAPI} from './registerAPI';

jest.mock('axios');
describe('Testing register API', () => {
    let registerResolve: AxiosResponse;
    beforeEach(() => {
        registerResolve = {...registerResolve, data: {}};
    });
    it('Registration', async () => {
        jest.spyOn(registerAPI, 'register').mockResolvedValue(registerResolve);
        const res = await registerAPI.register({email: '123@mail.com', password: '1234566'});
        expect(res.data).toEqual({});
    });
});