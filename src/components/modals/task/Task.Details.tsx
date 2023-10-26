import { NavLink } from 'react-router-dom';

import { BASE_URL } from '../../../utils/constants';
import { ITask } from '../../../types/task';

import styles from './Task.Details.module.sass';

import x from '@images/x.svg';
import { SelectProps } from 'antd';
import { Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../actions/redux';
import { updateTask } from '../../../actions/tasks';
import { IUser } from '../../../types/user';
import Popup from './Task.Popup';
import { useFormattedDate } from '../../../utils/functions';
import { ITag } from '../../../types/tag';
import Deadline from './ui/deadline/Deadline';
import Responsible from './ui/responsible/Responsible';

interface TaskDetailsProps {
    closeModal: () => void,
    task: ITask
}

const TaskDetails = ({ closeModal, task }: TaskDetailsProps) => {
    const projectId = useAppSelector(state => state.commonReducer.projectId);
    const project = useAppSelector(state => state.projectReducer.projects.find(project => project.id === projectId));

    const dispatch = useAppDispatch();

    const [taskResponsible, setTaskResponsible] = useState<IUser[]>([]);

    const [taskTags, setTags] = useState<ITag[]>([]);
    const [tagsOptions, setTagsOptions] = useState<SelectProps['options']>([]);

    const [deadline, setDeadline] = useState<Date | null>(task.deadline || null);

    const [isTagsEditing, setTagsEdit] = useState<boolean>(false);
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

    const tags = useMemo(() => task.tags.map(tag => String(tag.id)), [task.tags]);

    const handleChange = (value: string | string[]) => {
        if (typeof value === 'string') {
            const userOut = project?.participants.find(user => user.user.id === +value)?.user;;
            if (userOut) {
                setTaskResponsible(prev => [...prev, userOut])
            }

        } else if (Array.isArray(value)) {
            let usersOut: IUser[] = [];
            value.forEach(val => {
                const user = project?.participants.find(user => user.user.id === +val)?.user;
                if (user) {
                    usersOut.push(user);
                }
            });
            setTaskResponsible([...usersOut]);
        }
    };

    const handleSave = async () => {
        await dispatch(updateTask({
            id: task.id,
            responsible: taskResponsible,
            deadline
        }))
    }

    const createdAt = useFormattedDate(task.createdAt);

    if (project) return (
        <div className={styles.details}>
            <div className={styles.btns}>
                <button onClick={() => setPopupOpen(true)} className={styles.dots}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <button className={styles.close} onClick={closeModal}>
                    <img src={x} alt="close" />
                </button>
                {isPopupOpen && <Popup
                    close={() => setPopupOpen(false)}
                    id={task.id}
                />}
            </div>

            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        Details
                    </div>
                </div>
                <div className={styles.list}>
                    <Deadline
                        deadline={deadline}
                        setDeadline={(val: Date) => setDeadline(val)}
                        save={handleSave}
                    />
                    <div className={styles.block}>
                        <div className={styles.block_header}>
                            Creator
                        </div>
                        <NavLink to="/" className={styles.user}>
                            <div className={styles.avatar}>
                                <img src={`${BASE_URL}/file/${task.reporter.avatar}`} alt={task.reporter.avatar} />
                            </div>
                            <span>{task.reporter.firstName} {task.reporter.lastName}</span>
                        </NavLink>
                    </div>

                    <Responsible
                        set={setTaskResponsible}
                        save={handleSave}
                        participants={project.participants}
                        task={task}
                    />

                    <div className={styles.block}>
                        <div className={styles.block_header}>
                            Labels
                            {isTagsEditing &&
                                <button
                                    className={styles.btn}
                                    onClick={() => setTagsEdit(false)}
                                >
                                    save
                                </button>
                            }

                        </div>
                        {
                            isTagsEditing
                                ? <Select
                                    mode="multiple"
                                    size="middle"
                                    placeholder="Select executant"
                                    defaultValue={tags}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                    options={tagsOptions}
                                />
                                : taskTags.length > 0
                                    ? <>more</>
                                    : <button onClick={() => setTagsEdit(true)} className={styles.btn} style={{ textAlign: "left" }}>
                                        + Add tags
                                    </button>
                        }
                    </div>
                </div>
            </div>

            <div className={styles.date}>
                Created: {createdAt}
            </div>
        </div>
    );
}

export default TaskDetails;