import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITask, ITaskUpdate } from '../../types/task';

type TasksState = {
    tasks: ITask[],
    isLoading: boolean,
    error: string,
};

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: ""
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskFetching(state) {
            state.isLoading = true;
        },
        taskFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        addTask(state, action: PayloadAction<ITask>) {
            // state.tasks.push(action.payload);
            state.tasks = [action.payload, ...state.tasks];
            state.tasks = state.tasks.map((task, index) => {
                return {
                    ...task,
                    index
                }
            })
            state.isLoading = false;
        },
        setTasks(state, action: PayloadAction<ITask[]>) {
            state.tasks = action.payload;
        },
        updateTask(state, action: PayloadAction<ITaskUpdate>) {
            state.tasks = state.tasks.map(task => task.id === action.payload.id ? { ...task, ...action.payload } : task);
        },
        
    },
})

export default taskSlice.reducer