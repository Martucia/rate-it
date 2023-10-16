import { IStage } from "./stage"

export interface IUser {
    id: number
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    stages: IStage[] 
}

export interface IRegUser {
    firstName: string
    lastName: string
    email: string
    password: string
    // avatar: string | null
}

export interface ILogUser {
    email: string
    password: string
}

export interface IParticipant {
    id: number
    user: IUser,
    role: string,
    status: string
}