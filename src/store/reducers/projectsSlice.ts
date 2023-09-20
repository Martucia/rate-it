import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProject, IProjectUpdate } from "../../types/project";
import { ITask } from "../../types/task";
import { IStage, IStagesUpdate } from "../../types/stage";

type ProjectsState = {
    projects: IProject[],
    isLoading: boolean,
    error: string,
}

const initialState: ProjectsState = {
    projects: [],
    isLoading: false,
    error: ""
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
            console.log(action.payload)
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
        },
        // TASK SLICES
        addTask(state, action: PayloadAction<ITask>) {
            console.log(action.payload)
            // state.projects = state.projects.map(project =>
            //     project.id == action.payload.project
            //         ? {
            //             ...project, stages: project.stages.map(stage => stage.id == action.payload.stage ? {
            //                 ...stage, tasks: stage.tasks ? [...stage.tasks, action.payload] : [action.payload]
            //             } : stage)
            //         }
            //         : project
            // );
            state.isLoading = false;
        },
        // STAGES SLICES
        addStage(state, action: PayloadAction<IStage>) {
            // console.log(action.payload.projectId, action.payload, state.projects)
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
                        ...project, stages: project.stages.map(stage => stage.id === st.id
                            ? {
                                ...stage, ...st
                            }
                            : stage)
                    }
                    : project
                )
            })
        }
    }
})

//2199FF

export default projectsSlice.reducer