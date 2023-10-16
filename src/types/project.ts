import { IStage } from "./stage"
import { ITag } from "./tag"
import { IParticipant } from "./user"

export interface IProject {
    id: number
    name: string
    createdAt: Date,
    updatedAt: Date,
    participants: IParticipant[],
    stages: IStage[],
    downloadedTasks: 'all' | 'one' | 'none',
    tags: ITag[]
}

export interface IProjectCreate {
    name: string
}

export interface IProjectUpdate extends Partial<IProject> { }
