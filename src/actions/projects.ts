import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { IProject, IProjectCreate, IProjectUpdate } from '../types/project';
import { AppDispatch } from '../store/store';
import { projectsSlice } from '../store/reducers/projectsSlice';
import { getConfig } from '../utils/functions';
import { commonSlice } from '../store/reducers/commonSlice';

export const createProject = (data: IProjectCreate) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectsSlice.actions.projectFetching());

        const response = await axios.post<IProject>(`${BASE_URL}/projects`, data, getConfig());

        dispatch(projectsSlice.actions.addProject(response.data));
        dispatch(commonSlice.actions.toggleModal({ modalName: "projectCreateOpen", isOpen: false }))

        return response.data.id;
    } catch (e: any) {
        dispatch(projectsSlice.actions.projectFetchingError(e.response.data.message || e.message));
    }
}

export const getProject = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectsSlice.actions.projectFetching());

        const response = await axios.get<IProject>(`${BASE_URL}/projects/${id}`, getConfig());

        dispatch(projectsSlice.actions.setProject(response.data));
    } catch (e: any) {
        console.log(e)
        dispatch(projectsSlice.actions.projectFetchingError(e.response.data.message || e.message));
    }
}

export const updateProject = (project: IProjectUpdate) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectsSlice.actions.projectFetching());

        const response = await axios.patch<IProject>(`${BASE_URL}/projects/${project.id}`, project, getConfig());

        dispatch(projectsSlice.actions.updateProject(response.data));
    } catch (e: any) {
        console.log(e)
        dispatch(projectsSlice.actions.projectFetchingError(e.response.data.message || e.message));
    }
}