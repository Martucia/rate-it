import { ITask } from "./task";
import { IUser } from "./user";

export interface IComment {
    id: number,
    text: string,
    createdAt: Date,
    user: IUser,
    task: ITask
}

export interface ICommentCreate {
    text: string,
    task: {
        id: number
    }
}


export interface ICommentUpdate extends Partial<IComment> { }