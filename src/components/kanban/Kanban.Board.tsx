import { useEffect, useRef, FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../actions/redux';
import Stage from '../stage/Stage';
import styles from './Kanban.module.sass';
import CreateUpdateStage from '../stage/Stage.Create.Update';
import { IStage, IStageCreate } from '../../types/stage';
import { createStage } from '../../actions/stages';
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskBlock from '../modals/task/Task.Block';
import { ITask } from '../../types/task';
import { commonSlice } from '../../store/reducers/commonSlice';
import { Outlet } from 'react-router-dom';
import ScrollBtn from './Kanbal.ScrollBtn';
import { useDrag } from '../../hooks/drag';

interface BoardProps {
    projectId: number,
    currentStages: IStage[],
    currentTasks: ITask[]
}

const Board: FC<BoardProps> = ({ projectId, currentStages, currentTasks }) => {
    const { isStageCreateOpen } = useAppSelector(state => state.commonReducer);

    const [stages, setStages] = useState<IStage[]>([]);
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        setStages(currentStages);
    }, [currentStages])

    useEffect(() => {
        setTasks(currentTasks);
    }, [currentTasks])

    const {
        sensors,
        stagesId,
        onDragStart,
        onDragEnd,
        onDragOver,
        activeStage,
        activeTask
    } = useDrag({ projectId, stages, tasks, setStages, setTasks });

    const dispatch = useAppDispatch();

    const kanbanRef = useRef<HTMLDivElement | null>(null);

    function closeStageCreate() {
        dispatch(commonSlice.actions.toggleParam({
            param: "isStageCreateOpen",
            value: false
        }))
    }

    const handleCreateUpdateStage = async (data: IStageCreate) => {
        const stage = { ...data, project: { id: projectId } };

        const result = await dispatch(createStage(stage));

        if (result) {
            closeStageCreate();
        }
    }

    useEffect(() => {
        if (isStageCreateOpen && kanbanRef.current) {
            kanbanRef.current.scrollLeft = kanbanRef.current.scrollWidth;
        }
    }, [isStageCreateOpen])

    return (
        <div className={styles.kanban_wrapper}>
            <ScrollBtn currentRef={kanbanRef} />

            <div ref={kanbanRef} className={stages.length > 0 || isStageCreateOpen ? styles.kanban : styles.empty}>
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
            </div>

            <Outlet />
        </div>
    );
}

export default Board;