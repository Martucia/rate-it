import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProject, IProjectUpdate } from "../../types/project";
import { IStage, IStagesUpdate } from "../../types/stage";

type ProjectsState = {
    projects: IProject[],
    isLoading: boolean,
    error: string,
}

const initialState: ProjectsState = {
    projects: [],
    isLoading: false,
    error: "",
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        projectFetching(state) {
            state.isLoading = true
        },
        projectFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setProjects(state, action: PayloadAction<IProject[]>) {
            state.projects = action.payload
            state.isLoading = false
        },
        addProject(state, action: PayloadAction<IProject>) {
            state.projects = [...state.projects, action.payload]
            state.isLoading = false
        },
        removeProject(state, action: PayloadAction<number>) {
            state.projects = state.projects.filter(project => project.id !== action.payload);
            state.isLoading = false
        },
        updateProject(state, action: PayloadAction<IProjectUpdate>) {
            state.projects = state.projects.map(project => project.id === action.payload.id ? { ...project, ...action.payload } : project);
            state.isLoading = false
        },
        setProject(state, action: PayloadAction<IProject>) {
            if (state.projects.length > 0) {
                const check = state.projects.find(project => project.id === action.payload.id);

                if (check) {
                    state.projects = state.projects.map(project => project.id === action.payload.id ? action.payload : project);
                } else {
                    state.projects = [...state.projects, action.payload]
                }
            } else {
                state.projects = [action.payload]
            }
            state.isLoading = false;
        },
        // STAGES SLICES
        addStage(state, action: PayloadAction<IStage>) {
            state.projects = state.projects.map(project =>
                project.id == action.payload.project.id
                    ? {
                        ...project, stages: [...project.stages, action.payload]
                    }
                    : project
            );
            state.isLoading = false;
        },
        moveStage(state, action: PayloadAction<{ projectId: number, stagesToMove: IStagesUpdate[] }>) {
            action.payload.stagesToMove.forEach(st => {
                state.projects = state.projects.map(project => project.id === action.payload.projectId
                    ? {
                        ...project,
                        stages: project.stages.map(stage => stage.id === st.id
                            ? {
                                ...stage, ...st
                            }
                            : stage
                        )
                    }
                    : project
                )
            })
        },
        updateStage(state, action: PayloadAction<{ projectId: number, stage: IStagesUpdate }>) {
            state.projects = state.projects.map(project => project.id === action.payload.projectId
                ? {
                    ...project,
                    stages: project.stages.map(stage => stage.id === action.payload.stage.id
                        ? {
                            ...stage, ...action.payload.stage
                        }
                        : stage
                    )
                }
                : project
            )
        },
        removeStage(state, action: PayloadAction<{ projectId: number, id: number }>) {
            state.projects = state.projects.map(project => project.id === action.payload.projectId
                ? {
                    ...project,
                    stages: project.stages.filter(stage => stage.id !== action.payload.id)
                }
                : project
            )
        }
    }
})

//2199FF

export default projectsSlice.reducer