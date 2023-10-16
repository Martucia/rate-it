import { ITask } from "./task";
import { IUser } from "./user";

export interface IComment {
    id: number,
    text: string,
    createdAt: Date,
    user: IUser,
    task: ITask,
    files: string[]
}

// export interface ICommentCreate {
//     text: string,
//     task: {
//         id: number
//     },
//     files: any[]
// }

export interface ICommentCreate {
    comment: {
        text: string,
        task: {
            id: number
        }
    },
    files: any[]
}

export interface ICommentUpdate {
    comment: {
        id: number,
        text: string,
        files: string[]
    },
    files: any[]
}

// export interface ICommentUpdate extends Partial<IComment> { }