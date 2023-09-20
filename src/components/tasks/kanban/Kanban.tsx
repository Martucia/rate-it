// import { useState } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../actions/redux';

import Stage from '../../stage/Stage';

import styles from './Kanban.module.sass';
import CreateStage from '../../stage/CreateStage';
import { IStage, IStageCreate } from '../../../types/stage';
import { createStage, moveStages } from '../../../actions/stages';
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskBlock from '../../taskBlock/TaskBlock';
import { ITask } from '../../../types/task';
import { IProject } from '../../../types/project';


interface KanbanProps {
    projectId: number
}

const Kanban = ({ projectId }: KanbanProps) => {
    const view = useAppSelector(state => state.commonReducer.tasksView);

    const project = useAppSelector<IProject | undefined>(state => state.projectReducer.projects.find(project => project.id === projectId));

    const [stages, setStages] = useState<IStage[]>([]);

    useEffect(() => {
        if (project) {
            const projectOut = [...project.stages];
            projectOut.sort((a, b) => a.index - b.index)
            setStages(projectOut);
        }
    }, [project]);

    const [isNewStageCreating, setNewStageCreating] = useState(false);

    const stagesId = useMemo(() => stages.map((stage: any) => stage.id), [stages]);

    const [activeStage, setActiveStage] = useState<IStage | null>(null);
    const [activeTask, setActiveTask] = useState<ITask | null>(null);

    const dispatch = useAppDispatch();

    const handleCreateStage = (data: IStageCreate) => {
        dispatch(createStage(data));
        setNewStageCreating(false);
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    if (stages) return (
        <div className={stages.length > 0 || isNewStageCreating ? styles.kanban : styles.empty}>
            {stages.length > 0 || isNewStageCreating
                ? <>
                    <DndContext
                        sensors={sensors}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        onDragOver={onDragOver}
                    >
                        <SortableContext items={stagesId}>
                            {stages.map((stage: any) =>
                                <Stage
                                    key={stage.id}
                                    openNewTaskCreate={() => setNewStageCreating(true)}
                                    stage={stage}
                                />
                            )}
                        </SortableContext>

                        {createPortal(
                            <DragOverlay>
                                {activeStage && (
                                    <Stage
                                        key={activeStage.id}
                                        openNewTaskCreate={() => setNewStageCreating(true)}
                                        stage={activeStage}
                                    />
                                )}
                                {activeTask && (
                                    <TaskBlock
                                        task={activeTask}
                                        key={activeTask.id}
                                        view={view}
                                    />
                                )}
                            </DragOverlay>,
                            document.body
                        )}
                    </DndContext>

                    {isNewStageCreating && (
                        <CreateStage create={(data: any) => handleCreateStage({ ...data, project: { id: projectId }, index: stages.length === 0 ? stages.length : stages.length + 1 })} />
                    )}
                </>
                : <>
                    <div className={styles.text}>
                        There are no stages yet
                    </div>
                    <div className={styles.subtext}>
                        You need to create one to start managing your goals
                    </div>
                    <button onClick={() => setNewStageCreating(true)} className={styles.btn}>
                        Create one
                    </button>
                </>
            }
        </div>
    )

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

        const activeId = active.id;
        const overId = over.id;

        console.log(over, active)

        // if (activeId === overId) return;

        const isActiveAStage = active.data.current?.type === "Stage";

        console.log(isActiveAStage)

        if (!isActiveAStage) return;

        // const overStageIndex = stages.findIndex((st) => st.id === overId);

        const stagesToMove = stages.map((stage, index) => {
            return {
                id: stage.id,
                index
            }
        })

        dispatch(moveStages(stagesToMove, projectId));

        // dispatch(projectsSlice.actions.moveStage({ stagesToMove, projectId }));

        // dispatch(taskSlice.actions.updateTask({ id: Number(activeId), index: overStageIndex + 1 }))
    }

    function onDragOver(event: DragOverEvent) {

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        // const overStageId = over.data.current?.task.stage.id;

        // console.log(over)

        if (activeId === overId) return;

        // console.log(activeId, overId)

        const isActiveATask = active.data.current?.type === "Task";
        const isActiveAStage = active.data.current?.type === "Stage";

        const isOverATask = over.data.current?.type === "Task";
        const isOverAStage = over.data.current?.type === "Stage";

        if (!isActiveATask && !isActiveAStage) return;

        // console.log("over", over)
        // console.log("activeTask", activeTask, "isOverATask", isOverATask)

        if (isActiveAStage && isOverAStage) {
            setStages((stages) => {
                const activeIndex = stages.findIndex((s) => s.id === activeId);
                const overIndex = stages.findIndex((s) => s.id === overId);

                return arrayMove(stages, activeIndex, overIndex);
            });
        }

        // Im dropping a Task over another Task
        // if (isActiveATask && isOverATask) {
        //     dispatch(projectsSlice.actions.dragTask({
        //         currentStageId: activeTask?.stage.id,
        //         overStageId: over.data.current?.task.stage.id,
        //         overStage: over.data.current?.task.stage,
        //         activeTask,
        //         projectId,
        //     }))
        // }

        // // Im dropping a Task over a column

        // console.log(isActiveATask && isOverAColumn)

        if (isActiveATask && isOverAStage) {
            // dispatch(projectsSlice.actions.dragTaskToStage({
            //     currentStageId: activeTask?.stage.id,
            //     overStageId: over.data.current?.stage.id,
            //     overStage: over.data.current?.stage,
            //     activeTask,
            //     projectId,
            // }))
        }
    }
    // const tasks = useAppSelector(state => state.taskReducer.tasks);

    // if (view === "list") {
    //     return (
    //         <>
    //             <div className={styles.list}>
    //                 {tasks.map(task => <TaskBlock view="task_list" key={task.id} title={task.title} id={task.id} />)}
    //             </div>
    //         </>

    //     );
    // }




}

export default Kanban;