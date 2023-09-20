import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { WritableDraft } from 'immer/dist/internal.js';
import { produce, Draft } from 'immer'; // Додайте Draft для вказівки типу стану

type CommonState = {
    tasksView: string,
    projectCreateOpen: boolean,
    projectParticipantsOpen: boolean,
    projectParticipants: {
        type: string | null,
        id: number | null,
    },
    [key: string]: any
}

type CommonStateKeys = keyof CommonState;

const initialState: CommonState = {
    tasksView: 'board',
    projectCreateOpen: false,
    projectParticipantsOpen: false,
    projectParticipants: {
        type: null,
        id: null
    }
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        changeView(state, action: PayloadAction<{ view: string }>) {
            state.tasksView = action.payload.view;
        },
        toggleModal(state, action: PayloadAction<{ modalName: CommonStateKeys, isOpen: boolean }>) {
            return produce(state, (draft: Draft<CommonState>) => {
                draft[action.payload.modalName] = action.payload.isOpen;
            });
        },
        openParticipantsModal(state, action: PayloadAction<{ type: string, id: number }>) {
            state.projectParticipantsOpen = true;
            state.projectParticipants.id = action.payload.id;
            state.projectParticipants.type = action.payload.type;
        }
    },
})

export default commonSlice.reducer