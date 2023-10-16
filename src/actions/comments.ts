import axios from 'axios';

import { BASE_URL, SOCKET_URL } from '../utils/constants';
import { getConfig } from '../utils/functions';
import io, { Socket } from 'socket.io-client';
import { AppDispatch } from '../store/store';
import { taskSlice } from '../store/reducers/tasksSlice';
import { IComment, ICommentCreate, ICommentUpdate } from '../types/comment';

export const createComment = (data: ICommentCreate) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.taskFetching());

        const formData = new FormData();

        data.files.forEach((file) => {
            formData.append('files', file);
        });

        formData.append('comment', JSON.stringify(data.comment));

        const response = await axios.post<IComment>(`${BASE_URL}/comments/`, formData, getConfig("files"));

        dispatch(taskSlice.actions.addComment({ comment: response.data, taskId: data.comment.task.id }));

        return true;
    } catch (e) {
        console.log(e)

        return false;
    }
}

export const updateComment = (data: ICommentUpdate) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.taskFetching());

        const formData = new FormData();

        data.files.forEach((file) => {
            formData.append('files', file);
        });

        formData.append('comment', JSON.stringify(data.comment));

        const response = await axios.patch<any>(`${BASE_URL}/comments/${data.comment.id}`, formData, getConfig("files"));

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

// SOCKET

export class SocketApi {
    static socket: null | Socket;

    static createConection(): void {
        this.socket = io(SOCKET_URL)

        this.socket.on('connect', () => {
            console.log("connected")
        })
        this.socket.on('disconnect', (e) => {
            console.log("disconnected", e)
        })
    }

    static send(comment: ICommentCreate): void {
        this.socket?.emit('comment', comment);
    }
}