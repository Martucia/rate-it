import { IComment } from "./comment"
import { IProject } from "./project"
import { IStage } from "./stage"
import { ITag } from "./tag"
import { IUser } from "./user"

export interface ITask {
    id: number
    index: number,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    deadline: Date | null,
    responsible: IUser[],
    reporter: IUser,
    project?: IProject,
    stage: IStage,
    comments: IComment[],
    childTasks: ITask[],
    parentTask: ITask,
    files: string[],
    downloadedTask: 'full' | 'simple',
    tags: ITag[]
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

export interface ITaskUpdate extends Partial<ITask> {}
