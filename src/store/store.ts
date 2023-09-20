import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from './reducers/userSlice'
import taskReducer from './reducers/tasksSlice'
import commonReducer from './reducers/commonSlice'
import projectReducer from './reducers/projectsSlice'

const rootReducer = combineReducers({
    userReducer,
    taskReducer,
    commonReducer,
    projectReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

