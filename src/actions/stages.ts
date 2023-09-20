import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { AppDispatch } from '../store/store';
import { projectsSlice } from '../store/reducers/projectsSlice';
import { getConfig } from '../utils/functions';
import { IStage, IStageCreate, IStagesUpdate } from '../types/stage';

export const createStage = (data: IStageCreate) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectsSlice.actions.projectFetching());

        const response = await axios.post<IStage>(`${BASE_URL}/stages`, data, getConfig());

        dispatch(projectsSlice.actions.addStage(response.data));

        return response.data.id;
    } catch (e: any) {
        dispatch(projectsSlice.actions.projectFetchingError(e.response.data.message || e.message));
    }
}

export const moveStages = (stages: IStagesUpdate[], projectId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectsSlice.actions.projectFetching());

        await axios.patch<any>(`${BASE_URL}/stages/move/`, stages, getConfig());

        dispatch(projectsSlice.actions.moveStage({ stagesToMove: stages, projectId }));

    } catch (e: any) {
        console.log(e)
    }
}