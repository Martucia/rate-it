import { Project } from "src/projects/entities/project.entity"
import { Stage } from "src/stages/entities/stage.entity"
import { Task } from "src/tasks/entities/task.entity"
import { User } from "src/users/entities/user.entity"

export interface IUserLogin {
    id: number
    email: string
}

export interface IUser {
    id: number
    email: string,
    firstName: string,
    lastName: string,
    createdAt: Date,
    updatedAt: Date,
    password?: string,
    projects?: IProject[]
}

export interface IProject {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    tasks?: Task[],
    participants: User[],
    stages: Stage[]
}

export interface ITask {
    id: number,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    deadline: Date | null,
    responsibleUsers: User[],
    reporter: User,
    project: Project | null,
    stage: number | Stage
}

export interface IStage {
    id: number,
    name: string,
    color: string,
    background: string,
    index: number,
    project: IProject,
    tasks: ITask[],
}