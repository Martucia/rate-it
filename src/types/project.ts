import { IStage } from "./stage"
// import { ITask } from "./task"
import { IUser } from "./user"

export interface IProject {
    id: number
    name: string
    createdAt: Date,
    updatedAt: Date,
    // tasks: ITask[],
    participants: IUser[],
    stages: IStage[]
}

export interface IProjectCreate extends Omit<IProject, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'participants' | 'stages'> { }

export interface IProjectUpdate extends Partial<IProject> { }
