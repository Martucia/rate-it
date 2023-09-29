import axios from 'axios';

import { BASE_URL } from '../utils/constants';
import { getConfig } from '../utils/functions';
import { AppDispatch } from '../store/store';
import { taskSlice } from '../store/reducers/tasksSlice';
import { IComment, ICommentCreate, ICommentUpdate } from '../types/comment';

export const createComment = (data: ICommentCreate) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.taskFetching());

        const response = await axios.post<IComment>(`${BASE_URL}/comments/`, data, getConfig());

        dispatch(taskSlice.actions.addComment({ comment: response.data, taskId: data.task.id }));

        return true;
    } catch (e) {
        console.log(e)

        return false;
    }
}

export const updateComment = (comment: ICommentUpdate) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.taskFetching());

        const response = await axios.patch<any>(`${BASE_URL}/comments/${comment.id}`, comment, getConfig());

        console.log(response.data)

        dispatch(taskSlice.actions.updateComment(response.data));

        return true;
    } catch (e) {
        console.log(e)

        return false;
    }
}

export const deleteComment = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.taskFetching());

        const response = await axios.delete<any>(`${BASE_URL}/comments/${id}`, getConfig());

        dispatch(taskSlice.actions.removeComment({ id, taskId: response.data.taskId }));

        return true;
    } catch (e) {
        console.log(e)

        return false;
    }
}