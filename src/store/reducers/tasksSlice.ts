import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITask, ITaskUpdate } from '../../types/task';
import { IComment } from '../../types/comment';

type TasksState = {
    tasks: ITask[],
    isLoading: boolean,
    error: string,
};

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: "",

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
            const isExited = state.tasks.find(task => task.id == action.payload.id);

            if (isExited) return state;

            state.tasks = [action.payload, ...state.tasks];
            state.tasks = state.tasks.map((task, index) => {
                return {
                    ...task,
                    index
                }
            })
            state.isLoading = false;
        },
        setTask(state, action: PayloadAction<ITask>) {
            const isExited = state.tasks.find(task => task.id == action.payload.id);

            if (isExited) {
                if (isExited.downloadedTask === "simple") {
                    state.tasks = state.tasks.map(task => task.id === action.payload.id
                        ? action.payload
                        : task
                    )
                }
                return state
            };

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
            action.payload.forEach((newTask) => {
                if (!state.tasks.some((task) => task.id === newTask.id)) {
                    state.tasks.push(newTask);
                }
            });

            state.isLoading = false;
        },
        updateTask(state, action: PayloadAction<ITaskUpdate>) {
            state.tasks = state.tasks.map(task => task.id === action.payload.id ? { ...task, ...action.payload } : task);
            state.isLoading = false;
        },
        moveTasks(state, action: PayloadAction<ITaskUpdate[]>) {
            action.payload.forEach(ts => {
                state.tasks = state.tasks.map(task => task.id === ts.id
                    ? {
                        ...task, ...ts
                    }
                    : task
                )
            })
            state.isLoading = false;
        },
        removeTask(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        // COMMENTS
        addComment(state, action: PayloadAction<{ comment: IComment, taskId: number }>) {
            state.tasks = state.tasks.map(task => task.id === action.payload.taskId
                ? {
                    ...task, comments: [action.payload.comment, ...task.comments]
                }
                : task
            )
            state.isLoading = false;
        },
        updateComment(state, action: PayloadAction<IComment>) {
            state.tasks = state.tasks.map(task => task.id === action.payload.task.id
                ? {
                    ...task, comments: task.comments.map(comment => comment.id === action.payload.id
                        ? {
                            ...comment, ...action.payload
                        }
                        : comment
                    )
                }
                : task
            )
            state.isLoading = false;
        },
        removeComment(state, action: PayloadAction<{ id: number, taskId: number }>) {
            state.tasks = state.tasks.map(task => task.id === action.payload.taskId
                ? {
                    ...task, comments: task.comments.filter(comment => comment.id !== action.payload.id)
                }
                : task
            )
        }
    },
})

export default taskSlice.reducer