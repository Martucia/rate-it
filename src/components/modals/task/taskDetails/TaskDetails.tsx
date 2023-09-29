import { NavLink } from 'react-router-dom';

import { BASE_URL } from '../../../../utils/constants';
import { ITask } from '../../../../types/task';

import styles from './TaskDetails.module.sass';
import s from '../../index.module.sass';

import x from '@images/x.svg';
import arrow from '@images/arrow.svg';
import plus from '@images/pl.svg';
import { formatDateAndTime } from '../../../../utils/functions';

interface TaskDetailsProps {
    closeModal: () => void,
    task: ITask
}

const TaskDetails = ({ closeModal, task }: TaskDetailsProps) => {

    return (
        <div className={styles.details}>
            <button className={s.close} onClick={closeModal}>
                <img src={x} alt="close" />
            </button>

            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        Details
                    </div>
                    <button>
                        <img src={arrow} alt="" />
                    </button>
                </div>
                <div className={styles.list}>
                    <div className={styles.block}>
                        <div className={styles.name}>
                            Creator
                        </div>
                        <NavLink to="/" className={styles.user}>
                            <div className={styles.avatar}>
                                <img src={`${BASE_URL}/file/${task.reporter.avatar}`} alt={task.reporter.avatar} />
                            </div>
                            <span>{task.reporter.firstName} {task.reporter.lastName}</span>
                        </NavLink>
                    </div>

                    <div className={styles.block}>
                        <div className={styles.name}>
                            Executants
                        </div>
                        {task.responsible.length > 0
                            ? task.responsible.map(user =>
                                <NavLink to="/" className={styles.user}>
                                    <div className={styles.avatar}>
                                        <img src={`${BASE_URL}/file/${user.avatar}`} alt={user.avatar} />
                                    </div>
                                    <span>{user.firstName} {user.lastName}</span>
                                </NavLink>
                            )
                            : <button className={styles.plus}>
                                <img src={plus} alt="plus" />
                            </button>
                        }
                    </div>

                    <div className={styles.block}>
                        <div className={styles.name}>
                            Labels
                        </div>

                    </div>
                </div>
            </div>

            <div className={styles.date}>
                Created: {formatDateAndTime(task.createdAt)}
            </div>
        </div>
    );
}

export default TaskDetails;