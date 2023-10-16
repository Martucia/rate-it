import { NavLink } from 'react-router-dom';
import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useAppSelector } from '../../actions/redux';
import { ITask } from '../../types/task';

import styles from './TaskBlock.module.sass';

interface TaskBlockProps {
    task: ITask,
    view?: boolean
}

const TaskBlock = ({ task, view = false }: TaskBlockProps) => {
    const projectId = useAppSelector(state => state.commonReducer.projectId);

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
        disabled: view
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className={styles.dragTo}
            />
        );
    }

    return (
        <div
            className={`${styles.task} ${view && styles.task_list}`}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <NavLink className={styles.name} to={`/project/${projectId}/details/` + task.id}>
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
            {/* <div>
                <Participants max={2} participants={task.responsible} id={task.id} type="task" />
            </div> */}

        </div>
    );
}

export default TaskBlock;