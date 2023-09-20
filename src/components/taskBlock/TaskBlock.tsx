import { NavLink } from 'react-router-dom';

// import Participants from '../participants/Participants';

import styles from './TaskBlock.module.sass';
import { ITask } from '../../types/task';
import { useState } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskBlockProps {
    task: ITask,
    view?: string
}

const TaskBlock = ({ task, view }: TaskBlockProps) => {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(true);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        cursor: "grabbing"
    };

    // console.log('isDragging', isDragging)

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
      };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
            opacity-30
          bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
          "
            />
        );
    }

    return (
        <div
            className={`${styles.task} ${view && styles[view]}`}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
            onMouseDown={toggleEditMode}
        >
            <NavLink className={styles.name} to={`/task/` + task.id}>
                {task.title}
            </NavLink>
            <div className={styles.tags}>
                <div className={styles.tag}>
                    #UI007
                </div>
                <div className={styles.tag}>
                    Design
                </div>
                <div className={styles.tag}>
                    Backlog
                </div>
            </div>
            <div>
                {/* <Participants max={2} /> */}
            </div>

        </div>
    );
}

export default TaskBlock;