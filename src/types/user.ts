export interface IUser {
    id: number
    firstName: string,
    lastName: string,
    email: string,
    avatar: string | ImageData | null
}

export interface IRegUser {
    firstName: string
    lastName: string
    email: string
    password: string
    avatar: string | ImageData | null
}

export interface ILogUser {
    email: string
    password: string
}