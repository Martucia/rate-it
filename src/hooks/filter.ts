import { ITask } from "../types/task";

export function filterTasksByProjectId(tasks: ITask[], projectId: number) {
    if (!tasks) return null;

    const filteredTasks = tasks.filter((task) => task.project.id === projectId)

    return filteredTasks;

}

export function filterTasksByStageId(tasks: ITask[], stageId: number) {
    if (!tasks) return null;

    const filteredTasks = tasks.filter((task) => task.stage.id === stageId)

    return filteredTasks;

}