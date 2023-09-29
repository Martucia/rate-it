import { IStage } from "./stage"
// import { ITask } from "./task"
import { IParticipant, IUser } from "./user"

export interface IProject {
    id: number
    name: string
    createdAt: Date,
    updatedAt: Date,
    // tasks: ITask[],
    participants: IParticipant[],
    stages: IStage[],
    downloadedTask: 'all' | 'one' | 'none'
}

export interface IProjectCreate {
    name: string
}

export interface IProjectUpdate extends Partial<IProject> { }
