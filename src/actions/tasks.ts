import axios from 'axios';

import { BASE_URL } from '../utils/constants';
import { getConfig } from '../utils/functions';
import { ITask, ITaskCreate } from '../types/task';
import { AppDispatch } from '../store/store';
import { taskSlice } from '../store/reducers/tasksSlice';

export const createTask = (data: ITaskCreate) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.taskFetching())
        const response = await axios.post<ITask>(`${BASE_URL}/tasks/`, data, getConfig());
        dispatch(taskSlice.actions.addTask(response.data));
    } catch (e: any) {
        console.log(e)
        dispatch(taskSlice.actions.taskFetchingError(e.response.data.message || e.message));
    }
}

export const getAllTasks = (projectId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.taskFetching())
        const response = await axios.get<ITask[]>(`${BASE_URL}/tasks/${projectId}`, getConfig());
        dispatch(taskSlice.actions.setTasks(response.data));
    } catch (e: any) {
        dispatch(taskSlice.actions.taskFetchingError(e.response.data.message || e.message));
    }
}