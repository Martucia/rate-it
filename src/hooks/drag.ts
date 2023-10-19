import { useMemo, useState } from "react";
import { IStage } from "../types/stage";
import {
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { ITask } from "../types/task";
import { useAppDispatch } from "../actions/redux";
import { moveStages } from "../actions/stages";
import { moveTasks } from "../actions/tasks";
import { arrayMove } from "@dnd-kit/sortable";

interface useDragProps {
    projectId: number | null,
    stages: IStage[],
    tasks: ITask[],
    setStages: React.Dispatch<React.SetStateAction<IStage[]>>,
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

export function useDrag({ projectId, setStages, setTasks, stages, tasks }: useDragProps) {

    const [activeStage, setActiveStage] = useState<IStage | null>(null);
    const [activeTask, setActiveTask] = useState<ITask | null>(null);

    const dispatch = useAppDispatch();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );



    const stagesId = useMemo(() => stages.map((stage: IStage) => stage.id), [stages]);

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Stage") {
            setActiveStage(event.active.data.current.stage);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveStage(null);
        setActiveTask(null);

        const { active, over } = event;

        if (!over) return;

        const isActiveAStage = active.data.current?.type === "Stage";
        const isActiveATask = active.data.current?.type === "Task";

        if (isActiveAStage && projectId) {
            const stagesToMove = stages.map((stage, index) => {
                return {
                    id: stage.id,
                    index
                }
            })

            dispatch(moveStages(stagesToMove, projectId));

            return;
        }

        if (isActiveATask) {
            const tasksToMove = tasks.map(task => {
                return {
                    id: task.id,
                    index: task.index,
                    stage: task.stage
                }
            })

            dispatch(moveTasks(tasksToMove))

            return;
        }
    }

    function onDragOver(event: DragOverEvent) {

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isActiveAStage = active.data.current?.type === "Stage";

        const isOverATask = over.data.current?.type === "Task";
        const isOverAStage = over.data.current?.type === "Stage";

        if (!isActiveATask && !isActiveAStage) return;

        if (isActiveAStage && isOverAStage) {
            setStages((stages) => {
                const activeIndex = stages.findIndex((s) => s.id === activeId);
                const overIndex = stages.findIndex((s) => s.id === overId);

                return arrayMove(stages, activeIndex, overIndex);

            });
        }


        if (isActiveAStage && isOverATask) {
            setStages((stages) => {
                const activeIndex = stages.findIndex((s) => s.id === activeId);
                const overIndex = stages.findIndex((s) => s.id === over.data.current?.task.stage.id);

                return arrayMove(stages, activeIndex, overIndex);
            });
        }

        if (isActiveATask && isOverATask) {

            setTasks((tasks) => tasks.map((task) => task.id === activeId
                ? {
                    ...task,
                    stage: over.data.current?.task.stage,
                    index: over.data.current?.task.index + 1
                }
                : task.id !== overId
                    && task.index >= over.data.current?.task.index
                    && task.stage.id === over.data.current?.task.stage.id
                    ? {
                        ...task,
                        index: task.index + 1
                    }
                    : task
            ))
        }

        if (isActiveATask && isOverAStage) {

            setTasks((tasks) => tasks.map((task) => task.id === activeId
                ? {
                    ...task,
                    stage: over.data.current?.stage,
                    index: 0
                }
                : task.stage.id === over.id
                    ? {
                        ...task,
                        index: task.index + 1
                    }
                    : task
            ))
        }
    }

    return {
        onDragStart,
        onDragEnd,
        onDragOver,
        sensors,
        activeStage,
        activeTask,
        stagesId,
        stages,
        tasks
    }
}