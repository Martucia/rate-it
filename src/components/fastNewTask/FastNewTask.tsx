import React, { useState, useEffect, useRef } from 'react';
import Input from '../../ui/inputs/input/Input';
import styles from './FastNewTask.module.sass';
import { ClickOutside } from '../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../actions/redux';
import { createTask } from '../../actions/tasks';
// import { IStage } from '../../types/stage';
// import { IProject } from '../../types/project';

interface FastNewTaskProps {
    close: React.Dispatch<React.SetStateAction<boolean>>,
    stageId: number,
    // project: IProject
}

const FastNewTask = ({ close, stageId }: FastNewTaskProps) => {
    // const [projectId, setProjectId] = useState<any>(undefined);
    const projectId = useAppSelector(state => state.commonReducer.projectId);
    const [title, setTitle] = useState("");
    const user = useAppSelector(state => state.userReducer.user)

    const block = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    const handleSaveTask = () => {
        if (user) {
            dispatch(createTask({
                title,
                stage: stageId,
                project: Number(projectId)
            }));
            close(false);
        }
    }

    useEffect(() => ClickOutside({ element: block, close }), [])

    return (
        <div className={styles.new_task} ref={block}>
            <Input
                placeholder="Task title"
                name="title"
                value={title}
                setValue={(val: string) => setTitle(val)}
                onEnterDown={handleSaveTask}
                style={{ fontWeight: 600 }}
            />

            <p className={styles.text}>
                Press Enter↵ to create
            </p>
        </div>
    );
}

export default FastNewTask;