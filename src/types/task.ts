import { IProject } from "./project"
import { IStage } from "./stage"
import { IUser } from "./user"

export interface ITask {
    id: number
    title: string
    createdAt: Date,
    deadline: Date | null,
    responsible: IUser[],
    reporter: IUser,
    project?: IProject,
    stage: IStage,
    index: number
}

// export interface ITaskCreate extends Omit<ITask, 'id' | 'deadline' | 'createdAt' | 'stage' | 'project' | 'index' | 'responsible'> {
//     stage: number,
//     project: number
// }

export interface ITaskCreate {
    stage: number,
    project: number,
    title: string,
    
}

export interface ITaskUpdate extends Partial<ITask> { }