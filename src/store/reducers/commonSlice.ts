import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { WritableDraft } from 'immer/dist/internal.js';
import { produce, Draft } from 'immer'; // Додайте Draft для вказівки типу стану

type TaskModalType = {
    id: number | null,
    isOpen: boolean
}

type CommonState = {
    [key: string]: any,
    tasksView: string,
    projectCreateOpen: boolean,
    projectParticipantsOpen: boolean,
    projectParticipants: {
        type: string | null,
        id: number | null,
    },
    isStageCreateOpen: boolean,
    projectId: number | null,
    taskModal: TaskModalType
}

type CommonStateKeys = keyof CommonState;

const initialState: CommonState = {
    tasksView: 'board',
    projectCreateOpen: false,
    projectParticipantsOpen: false,
    projectParticipants: {
        type: null,
        id: null
    },
    isStageCreateOpen: false,
    projectId: null,
    taskModal: {
        id: null,
        isOpen: false
    }
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        changeView(state, action: PayloadAction<{ view: string }>) {
            state.tasksView = action.payload.view;
        },
        toggleParam(state, action: PayloadAction<{ param: CommonStateKeys, value: boolean | number }>) {
            return produce(state, (draft: Draft<CommonState>) => {
                draft[action.payload.param] = action.payload.value;
            });
        },
        openParticipantsModal(state, action: PayloadAction<{ type: string, id: number }>) {
            state.projectParticipantsOpen = true;
            state.projectParticipants.id = action.payload.id;
            state.projectParticipants.type = action.payload.type;
        },
        toggleTaskModal(state, action: PayloadAction<TaskModalType>) {
            state.taskModal.id = action.payload.id;
            state.taskModal.isOpen = action.payload.isOpen;
        }
    },
})

export default commonSlice.reducer