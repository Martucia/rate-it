import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../types/user';
import { IStage, IStagesUpdate } from '../../types/stage';

type UserState = {
    user: IUser | null,
    isLoading: boolean,
    error: string,
    isAuth: boolean | null
};

const initialState: UserState = {
    user: null,
    isAuth: null,
    isLoading: false,
    error: ""
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetching(state) {
            state.isLoading = true;
        },
        userFetchingSuccess(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.isAuth = true;
            state.error = '';
            state.user = action.payload;
        },
        userFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.isAuth = false;
            state.error = action.payload;
        },
        logOut: (state) => {
            state.isAuth = false;
            state.user = initialState.user;
            localStorage.removeItem('token');
        },
    },
})

export default userSlice.reducer;