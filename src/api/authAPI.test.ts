import {authAPI, LoginUserInfo, LogoutUserInfo, ResponseUpdateUserInfoType} from './authAPI';
import axios, {AxiosResponse} from 'axios';

jest.mock('axios');

const checkUserInfoResolved: LoginUserInfo = {
    avatar: 'avatar',
    created: '2020-06-19T17:38:50.679Z',
    deviceTokens: [],
    email: 'qwerty@gmail.com',
    isAdmin: false,
    name: 'userName',
    publicCardPacksCount: 392,
    rememberMe: false,
    token: 'token',
    tokenDeathTime: 1658081908653,
    updated: '2022-07-17T15:18:28.653Z',
    verified: false,
    __v: 0,
    _id: 'userID',
};
const updateUserResolved: ResponseUpdateUserInfoType = {
    token: '1',
    tokenDeathTime: 2,
    updateUser: {
        avatar: 'avatar',
        created: '2020-06-19T17:38:50.679Z',
        deviceTokens: [],
        email: '123@gmail.com',
        isAdmin: false,
        name: 'Lin',
        publicCardPacksCount: 392,
        rememberMe: false,
        token: 'b5f0ddd0-05e3-11ed-984f-01fd63187496',
        tokenDeathTime: 1658081908653,
        updated: '2022-07-17T15:18:28.653Z',
        verified: false,
        __v: 0,
        _id: '123',
    }
};


describe('Testing Auth API', () => {
    let checkUserInfoData: AxiosResponse<LoginUserInfo>;
    let updateUserData:AxiosResponse<ResponseUpdateUserInfoType>;
    let loginData:AxiosResponse<LoginUserInfo>;
    let logoutData:AxiosResponse<LogoutUserInfo>;
    beforeEach(() => {
        checkUserInfoData = {...checkUserInfoData, data: checkUserInfoResolved};
        updateUserData = {...updateUserData,data:updateUserResolved};
        loginData = {...checkUserInfoData, data:{...checkUserInfoData.data, email:'123@gmail.com', rememberMe:true}};
        logoutData = {...logoutData,data:{info:'Logout success!'}};
    });

    it('Check user info', async () => {
        jest.spyOn(authAPI, 'checkUserInfo').mockResolvedValue(checkUserInfoData);
        const res = await authAPI.checkUserInfo();
        expect(res.data.name).toBe('userName');
        expect(res.data.rememberMe).toBe(false);
    });

    it('Update user info', async () => {
        jest.spyOn(authAPI, 'updateUserInfo').mockResolvedValue(updateUserData);
        const res = await authAPI.updateUserInfo({name: 'Roman', avatar: '123'});
        expect(res.data.updateUser.name).toBe('Lin');
        expect(res.data.updateUser.email).toBe('123@gmail.com');
    });

    it('Login', async () => {
        jest.spyOn(authAPI, 'login').mockResolvedValue(loginData);
        const res = await authAPI.login('123@gmail.com', '12345', true);
        expect(res.data.name).toBe('userName');
        expect(res.data.email).toBe('123@gmail.com');
        expect(res.data.rememberMe).toBe(true);
    });

    it('Logout', async () => {
        jest.spyOn(authAPI, 'logout').mockResolvedValue(logoutData);
        const res = await authAPI.logout();
        expect(res.data.info).toBe('Logout success!');
    });
});