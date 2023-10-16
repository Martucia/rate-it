import { NavLink } from 'react-router-dom';

import { BASE_URL } from '../../../../utils/constants';
import { ITask } from '../../../../types/task';

import styles from './TaskDetails.module.sass';

import x from '@images/x.svg';
import plus from '@images/pl.svg';
import { SelectProps } from 'antd';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../actions/redux';
import { updateTask } from '../../../../actions/tasks';
import { IUser } from '../../../../types/user';
import TaskPopup from '../../../popups/taskPopup/TaskPopup';
import { useFormattedDate } from '../../../../utils/functions';
import { ITag } from '../../../../types/tag';

interface TaskDetailsProps {
    closeModal: () => void,
    task: ITask
}

const TaskDetails = ({ closeModal, task }: TaskDetailsProps) => {
    const projectId = useAppSelector(state => state.commonReducer.projectId);
    const project = useAppSelector(state => state.projectReducer.projects.find(project => project.id === projectId));

    const dispatch = useAppDispatch();

    const [responsibleOptions, setOptions] = useState<SelectProps['options']>([]);
    const [taskResponsible, setTaskResponsible] = useState<IUser[]>([]);

    const [taskTags, setTags] = useState<ITag[]>([]);
    const [tagsOptions, setTagsOptions] = useState<SelectProps['options']>([]);

    const [isResponsibleEditing, setResponsibleEditing] = useState<boolean>(false);
    const [isTagsEditing, setTagsEditing] = useState<boolean>(false);
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

    // const resposible = task.responsible.map(user => ({
    //     label: `${user.firstName} ${user.lastName}`,
    //     value: user.id
    // }));

    const resposible = task.responsible.map(user => String(user.id));
    const tags = task.tags.map(tag => String(tag.id));

    useEffect(() => {
        if (project) {
            setOptions(project.participants.map(user => {
                return {
                    value: String(user.user.id),
                    label: `${user.user.firstName} ${user.user.lastName}`
                }
            }));

            setTaskResponsible(task.responsible);
        }
    }, [project])

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
        const result = await dispatch(updateTask({
            id: task.id,
            responsible: taskResponsible
        }))

        if (result) {
            setResponsibleEditing(false);
        }
    }

    const createdAt = useFormattedDate(task.createdAt);

    return (
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
                {isPopupOpen && <TaskPopup
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

                    <div className={styles.block}>
                        <div className={styles.block_header}>
                            Executants
                            <button
                                className={styles.btn}
                                onClick={() =>
                                    isResponsibleEditing
                                        ? handleSave()
                                        : setResponsibleEditing(!isResponsibleEditing)}
                            >
                                {isResponsibleEditing ? "save" : "edit"}
                            </button>
                        </div>
                        {isResponsibleEditing
                            ?
                            <Select
                                mode="multiple"
                                size="middle"
                                placeholder="Select executant"
                                defaultValue={resposible}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                                options={responsibleOptions}
                            />
                            :
                            task.responsible.length > 0
                                ? task.responsible.map(user =>
                                    <NavLink key={user.id} to="/" className={styles.user}>
                                        <div className={styles.avatar}>
                                            <img src={`${BASE_URL}/file/${user.avatar}`} alt={user.avatar} />
                                        </div>
                                        <span>{user.firstName} {user.lastName}</span>
                                    </NavLink>
                                )
                                : <button
                                    className={styles.plus}
                                    onClick={() => setResponsibleEditing(!isResponsibleEditing)}
                                >
                                    <img src={plus} alt="plus" />
                                </button>
                        }


                    </div>

                    <div className={styles.block}>
                        <div className={styles.block_header}>
                            Labels
                            {isTagsEditing &&
                                <button
                                    className={styles.btn}
                                    onClick={() => setTagsEditing(false)}
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
                                    : <button onClick={() => setTagsEditing(true)} className={styles.btn} style={{ textAlign: "left" }}>
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