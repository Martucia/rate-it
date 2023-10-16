import axios from 'axios';

import { BASE_URL } from '../utils/constants';
import { getConfig } from '../utils/functions';
import { ITask, ITaskCreate, ITaskUpdate } from '../types/task';
import { AppDispatch } from '../store/store';
import { taskSlice } from '../store/reducers/tasksSlice';
import { projectsSlice } from '../store/reducers/projectsSlice';

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
        const response = await axios.get<ITask[]>(`${BASE_URL}/tasks/all/${projectId}`, getConfig());
        dispatch(taskSlice.actions.setTasks(response.data));
        dispatch(projectsSlice.actions.updateProject({ id: projectId, downloadedTasks: "all" }))
    } catch (e: any) {
        dispatch(taskSlice.actions.taskFetchingError(e.response.data.message || e.message));
    }
}

export const moveTasks = (tasks: ITaskUpdate[]) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.taskFetching());

        await axios.patch<any>(`${BASE_URL}/tasks/move/`, tasks, getConfig());

        dispatch(taskSlice.actions.moveTasks(tasks));

    } catch (e: any) {
        console.log(e)
    }
}

export const getTask = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.taskFetching())
        const response = await axios.get<ITask>(`${BASE_URL}/tasks/${id}`, getConfig());
        dispatch(taskSlice.actions.setTask(response.data));
    } catch (e: any) {
        dispatch(taskSlice.actions.taskFetchingError(e.response.data.message || e.message));
    }
}

export const updateTask = (data: ITaskUpdate) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.taskFetching())
        const response = await axios.patch<ITask>(`${BASE_URL}/tasks/${data.id}`, data, getConfig());
        dispatch(taskSlice.actions.updateTask(response.data));

        return true;
    } catch (e: any) {
        console.log(e)
        dispatch(taskSlice.actions.taskFetchingError(e.response.data.message || e.message));

        return false;
    }
}

export const deleteTask = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.taskFetching())

        await axios.delete<any>(`${BASE_URL}/tasks/${id}`, getConfig());
        
        dispatch(taskSlice.actions.removeTask(id));

        return true;
    } catch (e: any) {
        dispatch(taskSlice.actions.taskFetchingError(e.response.data.message || e.message));

        return false;
    }
}