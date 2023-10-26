import { NavLink } from 'react-router-dom';
import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useAppSelector } from '../../../actions/redux';
import { ITask } from '../../../types/task';

import styles from './Task.Block.module.sass';
import Participants from '../../participants/Participants';

import dayjs from 'dayjs';

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

    const deadline = task.deadline ? dayjs(task.deadline).format('MMMM D, HH:mm') : null;

    const deadlineStyle = dayjs(task.deadline) > dayjs() ? {} : { color: '#dd0000', opacity: 1, fontWeight: 600 };

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
            {task.tags.length > 0 &&
                <div className={styles.tags}>
                    {task.tags.map(tag => (
                        <div className={styles.tag} key={tag.id} style={{ color: tag.color, background: tag.background }}>
                            {tag.label}
                        </div>
                    ))}
                </div>
            }
            <div className={styles.deadline} style={deadlineStyle}>
                {deadline}
            </div>
            <div>
                <Participants max={2} participants={task.responsible} id={task.id} type="task" size="small" />
            </div>

        </div>
    );
}

export default TaskBlock;