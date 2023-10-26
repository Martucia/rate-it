import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../actions/redux';
import { getTask } from '../../../actions/tasks';

import Overflow from '../../overflow/Overflow';

import styles from './Task.module.sass';
import s from '../index.module.sass';

import attach from '@images/add_attach.svg';
import add_child from '@images/add_child.svg';
import Comments from '../../comments/Comments';
import { BASE_URL } from '../../../utils/constants';
import TaskDetails from './Task.Details';
import Title from './ui/title/Title';
import Description from './ui/desctiption/Description';

const Task = () => {
    const { id } = useParams();
    const task = useAppSelector(state => state.taskReducer.tasks.find(task => id ? task.id === +id : null));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        
        if (!task || task.downloadedTask === 'simple') {
            dispatch(getTask(+id));
        }
    }, [id]);

    const handleCloseModal = () => {
        navigate(-1);
    }

    if (id === undefined || !task || task.downloadedTask === 'simple') {
        return <Overflow isCenter={true} close={handleCloseModal}>
            <div className={`${s.modal} ${styles.task}`}>
                <div>Loading</div>
            </div>
        </Overflow>;
    }

    return (
        <Overflow isCenter={true} close={handleCloseModal}>
            <div className={`${s.modal} ${styles.task}`}>
                <div className={styles.content}>
                    <Title title={task.title} taskId={task.id} />
                    <Description desc={task.description} taskId={task.id} />

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
                                </div>
                            </div>
                        )}
                    </div>

                    <Comments id={+id} taskComments={task.comments} />
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