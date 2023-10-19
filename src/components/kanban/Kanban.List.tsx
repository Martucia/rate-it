import { FC } from 'react'
import { ITask } from '../../types/task';
import styles from './Kanban.module.sass';
import TaskBlock from '../taskBlock/TaskBlock';

interface ListProps {
    tasks: ITask[]
}

const List: FC<ListProps> = ({ tasks }) => {
    return (
        <div className={styles.list}>
            {tasks.map(task => <TaskBlock view={true} key={task.id} task={task} />)}
        </div>
    );
}

export default List;