import { useMemo, useState } from 'react';
import { ITask } from '../../types/task';

import TaskBlock from '../taskBlock/TaskBlock';

import styles from './Stage.module.sass';

import plus from '@images/pl.svg'
import FastNewTask from '../fastNewTask/FastNewTask';
import { useAppSelector } from '../../actions/redux';
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IStage } from '../../types/stage';

interface StageProps {
    // tasks: ITask[],
    openNewTaskCreate: () => void,
    stage: IStage
}

const Stage = ({ openNewTaskCreate, stage }: StageProps) => {
    const view = useAppSelector(state => state.commonReducer.tasksView);
    const [isTaskCreateOpen, setTaskCreateOpen] = useState(false);

    const tasks = useAppSelector<ITask[]>(state => state.taskReducer.tasks);

    const [editMode, setEditMode] = useState(false);

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
        // return ids || [];
    }, [tasks]);

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
        },
        disabled: editMode,
    });

    const filteredTasks = tasks
        .filter(task => task.stage.id === stage.id)
        .sort((a, b) => a.index - b.index);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
          bg-columnBackgroundColor
          opacity-40
          border-2
          border-pink-500
          w-[350px]
          h-[500px]
          max-h-[500px]
          rounded-md
          flex
          flex-col
          "
            ></div>
        );
    }

    const handleToggleTaskCreate = () => {
        setTaskCreateOpen(!isTaskCreateOpen)
    }

    const handleOpenDropDown = () => {
        openNewTaskCreate();
    }

    return (
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
                <span style={{ color: stage.color }}>{stage.name}</span>

                <div className={styles.count}>
                    <div className={styles.count_bg} style={{ background: stage.background, color: stage.color }}></div>
                    <span>{filteredTasks.length}</span>
                </div>
                <button className={styles.dots} onClick={handleOpenDropDown}>
                    <span style={{ background: stage.color }}></span>
                    <span style={{ background: stage.color }}></span>
                    <span style={{ background: stage.color }}></span>
                </button>
            </div>
            <div className={styles.wrapper}>
                <SortableContext items={tasksIds}>
                    {filteredTasks.map(task =>
                        // task.stage.id === stage.id
                        // &&
                        <TaskBlock
                            task={task}
                            key={task.id}
                            view={view}
                        />
                    )}
                </SortableContext>

            </div>
            {isTaskCreateOpen
                ? <FastNewTask
                    close={() => setTaskCreateOpen(false)}
                    stageId={stage.id}
                />
                : <button onClick={handleToggleTaskCreate} className={styles.plus}>
                    <img src={plus} alt="New task" />
                </button>
            }
        </div>
    );
}

export default Stage;