import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../actions/redux';
import { ITask } from '../../../types/task';
import { getTask } from '../../../actions/tasks';

import Overflow from '../../overflow/Overflow';

import styles from './Task.module.sass';
import s from '../index.module.sass';

import attach from '@images/add_attach.svg';
import add_child from '@images/add_child.svg';
import Comments from '../../comments/Comments';
import { BASE_URL } from '../../../utils/constants';
import TaskDetails from './taskDetails/TaskDetails';

const Task = () => {
    const { id } = useParams();
    const tasks = useAppSelector(state => state.taskReducer.tasks);
    const [task, setTask] = useState<ITask | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        const localTask = tasks.find(task => task.id === +id);

        if (localTask) {
            setTask(localTask);
        } else {
            dispatch(getTask(+id));
        }
    }, [id, tasks]);

    const handleCloseModal = () => {
        navigate(-1);
    }

    if (id === undefined || !task) {
        return <div>Loading</div>;
    }

    return (
        <Overflow isCenter={true} close={handleCloseModal}>
            <div className={`${s.modal} ${styles.task}`}>
                <div className={styles.content}>
                    <div className={styles.title}>
                        {task.title}
                    </div>
                    <div className={styles.desc}>
                        {task.description}
                    </div>

                    <div className={styles.btns}>
                        <button className={styles.btn}>
                            <img src={attach} alt="" />
                            <span>Attach</span>
                        </button>
                        <button className={styles.btn}>
                            <img src={add_child} alt="" />
                            <span>Add child issue</span>
                        </button>
                    </div>

                    <div className={styles.attachments}>
                        {task.files.map(file =>
                            <div className={styles.attachment}>
                                <div className={styles.image}>
                                    <img src={`${BASE_URL}/file/${file}`} alt={file} />
                                </div>
                                <div className={styles.attachment_content}>
                                    <NavLink to="/" className={styles.attachment_name}>
                                        {file}
                                    </NavLink>
                                    {/* <div className={styles.attachment_date}>
                                        27 Sep 2023, 03:13AM
                                    </div> */}
                                </div>
                            </div>
                        )}
                    </div>

                    <Comments id={+id} comments={task.comments} />
                </div>

                <TaskDetails
                    closeModal={handleCloseModal}
                    task={task}
                />
            </div>
        </Overflow>
    );
}

export default Task;