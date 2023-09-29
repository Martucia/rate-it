import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { IProject, IProjectCreate, IProjectUpdate } from '../types/project';
import { AppDispatch } from '../store/store';
import { projectsSlice } from '../store/reducers/projectsSlice';
import { getConfig } from '../utils/functions';
import { commonSlice } from '../store/reducers/commonSlice';
import { IParticipant } from '../types/user';

export const getAllProjects = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectsSlice.actions.projectFetching());

        const response = await axios.get<IProject[]>(`${BASE_URL}/projects`, getConfig());

        const projects = response.data.map<IProject>(pr => ({
            ...pr,
            downloadedTask: 'none'
        }))

        dispatch(projectsSlice.actions.setProjects(projects));
    } catch (e: any) {
        dispatch(projectsSlice.actions.projectFetchingError(e.response.data.message || e.message));
    }
}

export const createProject = (data: IProjectCreate) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectsSlice.actions.projectFetching());

        const response = await axios.post<IProject>(`${BASE_URL}/projects`, data, getConfig());

        dispatch(projectsSlice.actions.addProject(response.data));
        dispatch(commonSlice.actions.toggleParam({
            param: "projectCreateOpen",
            value: false
        }))

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

export const updateParticipants = (participant: IParticipant[], id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectsSlice.actions.projectFetching());

        console.log(participant)

        // const response = await axios.patch<IProject>(`${BASE_URL}/projects/${project.id}`, project, getConfig());

        // console.log(response)

        // dispatch(projectsSlice.actions.updateProject(response.data));
    } catch (e: any) {
        console.log(e)
        dispatch(projectsSlice.actions.projectFetchingError(e.response.data.message || e.message));
    }
}