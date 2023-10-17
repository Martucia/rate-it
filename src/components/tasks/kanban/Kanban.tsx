// import { useState } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../actions/redux';

import Stage from '../../stage/Stage';

import styles from './Kanban.module.sass';
import CreateUpdateStage from '../../stage/CreateUpdateStage';
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
import { moveTasks } from '../../../actions/tasks';
import empty from '@images/empty.png'
import { commonSlice } from '../../../store/reducers/commonSlice';
import { Outlet } from 'react-router-dom';

const Kanban = () => {
    const { tasksView, isStageCreateOpen } = useAppSelector(state => state.commonReducer);
    const projectId = useAppSelector(state => state.commonReducer.projectId);

    const project = useAppSelector<IProject | undefined>(state =>
        state.projectReducer.projects.find(project => project.id === projectId)
    );

    const [stages, setStages] = useState<IStage[]>([]);
    const kanbanRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (project && projectId) {
            const projectOut = [...project.stages];
            projectOut.sort((a, b) => a.index - b.index)
            setStages(projectOut);
        }
    }, [project]);

    const stagesId = useMemo(() => stages.map((stage: IStage) => stage.id), [stages]);

    const [activeStage, setActiveStage] = useState<IStage | null>(null);
    const [activeTask, setActiveTask] = useState<ITask | null>(null);

    const [isScrolledToLeft, setIsScrolledToLeft] = useState(true);
    const [isScrolledToRight, setIsScrolledToRight] = useState(true);

    const dispatch = useAppDispatch();

    const tasksSelector = useAppSelector<ITask[]>(state => state.taskReducer.tasks);

    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        if (tasksSelector) {
            const taskstOut = [...tasksSelector];
            taskstOut.sort((a, b) => a.index - b.index)
            setTasks(taskstOut);
        }
    }, [tasksSelector]);

    const handleOpenStageCreate = (val: boolean) => {
        dispatch(commonSlice.actions.toggleParam({
            param: "isStageCreateOpen",
            value: val
        }))
    }

    const handleCreateUpdateStage = async (data: IStageCreate) => {
        if (projectId) {
            const stage = { ...data, project: { id: projectId } };

            const result = await dispatch(createStage(stage));

            if (result) {
                handleOpenStageCreate(false);
            }
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    let scrollInterval: number | null = null;

    const handleScroll = (direction: "left" | "right") => {
        const scrollAmount = direction === "right" ? 5 : -5;
        if (kanbanRef.current) {
            kanbanRef.current.scrollLeft += scrollAmount;


            // const isScrolledLeft = kanbanRef.current.scrollLeft > 0;
            // // const isScrolledRight = kanbanRef.current.scrollLeft + kanbanRef.current.clientWidth < kanbanRef.current.scrollWidth;

            // if (isScrolledToLeft !== isScrolledLeft) {
            //     setIsScrolledToLeft(isScrolledLeft);
            // }
        }
    };

    const handleMouseEnter = (direction: "left" | "right") => {
        if (!scrollInterval) {
            scrollInterval = window.setInterval(() => handleScroll(direction), 20);
        }
    };

    const handleMouseLeave = () => {
        if (scrollInterval) {
            window.clearInterval(scrollInterval);
            scrollInterval = null;
        }
    };


    // useEffect(() => {
    //     if (kanbanRef.current && stages) {
    //         setIsScrolledToLeft(kanbanRef.current.scrollLeft > 0);
    //         setIsScrolledToRight(kanbanRef.current.scrollWidth !== kanbanRef.current.clientWidth);
    //     }
    // }, [stages])

    useEffect(() => {
        if (isStageCreateOpen && kanbanRef.current) {
            kanbanRef.current.scrollLeft = kanbanRef.current.scrollWidth;
        }
    }, [isStageCreateOpen])


    if (tasksView === "list") {
        return (
            <>
                <div className={styles.list}>
                    {tasks.map(task => <TaskBlock view={true} key={task.id} task={task} />)}
                </div>
            </>

        );
    }

    return (
        <div className={styles.kanban_wrapper}>
            {isScrolledToLeft && (
                <button
                    onMouseEnter={() => handleMouseEnter("left")}
                    onMouseLeave={handleMouseLeave}
                    className={`${styles.scroll} ${styles.to_left}`}
                >
                    {"<"}
                </button>
            )}

            {isScrolledToRight && (
                <button
                    onMouseEnter={() => handleMouseEnter("right")}
                    onMouseLeave={handleMouseLeave}
                    className={`${styles.scroll} ${styles.to_right}`}
                >
                    {">"}
                </button>
            )}

            <div ref={kanbanRef} className={stages.length > 0 || isStageCreateOpen ? styles.kanban : styles.empty}>
                {stages.length > 0 || isStageCreateOpen
                    ?
                    <>
                        <DndContext
                            sensors={sensors}
                            onDragStart={onDragStart}
                            onDragEnd={onDragEnd}
                            onDragOver={onDragOver}
                        >
                            <SortableContext items={stagesId}>
                                {stages.map(stage =>
                                    <Stage
                                        key={stage.id}
                                        stage={stage}
                                        tasks={tasks}
                                    />
                                )}
                            </SortableContext>

                            {createPortal(
                                <DragOverlay>
                                    {activeStage && (
                                        <Stage
                                            key={activeStage.id}
                                            stage={activeStage}
                                            tasks={tasks}
                                        />
                                    )}
                                    {activeTask && (
                                        <TaskBlock
                                            task={activeTask}
                                            key={activeTask.id}
                                        />
                                    )}
                                </DragOverlay>,
                                document.body
                            )}
                        </DndContext>

                        {isStageCreateOpen && (
                            <CreateUpdateStage create={handleCreateUpdateStage} />
                        )}
                    </>
                    : <>
                        <div className={styles.img}>
                            <img src={empty} alt="" />
                        </div>
                        <div className={styles.text}>
                            There are no stages yet
                        </div>
                        <div className={styles.subtext}>
                            You need to create one to start managing your goals
                        </div>
                        <button onClick={() => handleOpenStageCreate(true)} className={styles.btn}>
                            Create one
                        </button>
                    </>
                }
            </div>

            <Outlet />
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
}

export default Kanban;