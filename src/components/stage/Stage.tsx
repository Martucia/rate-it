import { useMemo, useState } from 'react';
import { ITask } from '../../types/task';

import TaskBlock from '../modals/task/Task.Block';

import styles from './Stage.module.sass';

import plus from '@images/pl.svg'
import TaskCreate from '../modals/task/Task.Create';
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IStage } from '../../types/stage';
import Popup from './Stage.Popup';
import CreateUpdateStage from './Stage.Create.Update';
import { sortItems } from '../../hooks/sort';
import { filterTasksByStageId } from '../../hooks/filter';

interface StageProps {
    tasks: ITask[],
    stage: IStage
}

const Stage = ({ stage, tasks }: StageProps) => {
    const [isTaskCreateOpen, setTaskCreateOpen] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isEditing, setEditing] = useState(false);

    const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: stage.id,
        data: {
            type: "Stage",
            stage,
        }
    });

    const filteredTasks = useMemo(() => sortItems(filterTasksByStageId(tasks, stage.id), 'index'), [tasks]);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const handleToggleTaskCreate = () => {
        setTaskCreateOpen(!isTaskCreateOpen)
    }

    const handleOpenDropDown = () => {
        setPopupOpen(true);
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className={styles.dragTo}
            />
        );
    }

    if (isEditing) {
        return <CreateUpdateStage
            oldColor={stage.color}
            oldBackground={stage.background}
            oldName={stage.name}
            id={stage.id}
            closeEdit={() => setEditing(false)}
        />
    }

    if (filteredTasks) return (
        <>
            <div
                id={String(stage.id)}
                className={styles.stage}
                ref={setNodeRef}
                style={style}
            >
                <div
                    className={styles.name}
                    style={{ background: stage.background, color: stage.color }}
                    {...attributes}
                    {...listeners}
                >
                    <span onDoubleClick={() => setEditing(true)} style={{ color: stage.color }}>{stage.name}</span>

                    <div className={styles.count}>
                        <div className={styles.count_bg} style={{ background: stage.background, color: stage.color }}></div>
                        <span>{filteredTasks.length}</span>
                    </div>
                    <button className={styles.dots} onClick={handleOpenDropDown}>
                        <span style={{ background: stage.color }}></span>
                        <span style={{ background: stage.color }}></span>
                        <span style={{ background: stage.color }}></span>
                    </button>

                    {isPopupOpen && <Popup
                        close={() => setPopupOpen(false)}
                        id={stage.id}
                        setEdit={() => {
                            setPopupOpen(false);
                            setEditing(true);
                        }}
                    />}
                </div>
                {filteredTasks.length > 0 && <div className={styles.wrapper}>
                    <SortableContext items={tasksIds}>
                        {filteredTasks.map(task =>
                            <TaskBlock
                                task={task}
                                key={task.id}
                            />
                        )}
                    </SortableContext>
                </div>}

                {isTaskCreateOpen
                    ? <TaskCreate
                        close={() => setTaskCreateOpen(false)}
                        stageId={stage.id}
                    />
                    : <button onClick={handleToggleTaskCreate} className={styles.plus}>
                        <img src={plus} alt="New task" />
                    </button>
                }
            </div>
        </>

    );
}

export default Stage;