// import { IProject } from "./project";
// import { ITask } from "./task";

import { IProject } from "./project";

export interface IStage {
    id: number,
    name: string,
    color: string,
    background: string,
    // project: IProject,
    project: IProject,
    // tasks: ITask[],
    index: number
}

// export interface IStageCreate extends Omit<IStage, 'id'> { }

export interface IStageCreate {
    name: string,
    color: string,
    background: string,
    project: number
}

export interface IStagesUpdate extends Partial<IStage> { }