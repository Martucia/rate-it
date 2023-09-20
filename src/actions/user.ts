import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { getConfig } from '../utils/functions';
import { ILogUser, IRegUser, IUser } from '../types/user';
import { AppDispatch } from '../store/store';
import { userSlice } from '../store/reducers/userSlice';

interface IResponse {
    user: IUser,
    token: string
}

export const registration = (data: IRegUser) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        
        const response = await axios.post<IResponse>(`${BASE_URL}/user/reg`, data);

        localStorage.setItem('token', response.data.token);

        dispatch(userSlice.actions.userFetchingSuccess(response.data.user));
    } catch (e: any) {
        dispatch(userSlice.actions.userFetchingError(e.response.data.message || e.message));
    }
}

export const login = (data: ILogUser) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching());

        const response = await axios.post<IResponse>(`${BASE_URL}/auth/login`, data);

        localStorage.setItem('token', response.data.token);

        dispatch(userSlice.actions.userFetchingSuccess(response.data.user));
    } catch (e: any) {
        dispatch(userSlice.actions.userFetchingError(e.response.data.message || e.message));
    }
}

export const auth = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())

        const response = await axios.get<IResponse>(`${BASE_URL}/auth/`, getConfig());

        localStorage.setItem('token', response.data.token);

        dispatch(userSlice.actions.userFetchingSuccess(response.data.user));
    } catch (e: any) {
        localStorage.removeItem('token')
        dispatch(userSlice.actions.userFetchingError(''));
    }
}