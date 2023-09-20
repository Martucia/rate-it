import { Routes, Route } from 'react-router-dom'

import TaskNavigation from '../../components/taskNavigation/TaskNavigation';
import Kanban from '../../components/tasks/kanban/Kanban';
import NotFound from '../systemPages/404';

import styles from './Tasks.module.sass';
import { useAppDispatch } from '../../actions/redux';
import { useEffect, useState } from 'react';
import { getProject } from '../../actions/projects';
import { getAllTasks } from '../../actions/tasks';


const Tasks = () => {
    const [projectId, setProjectId] = useState<any>(undefined);
    // const tasks = useAppSelector(state => state.projectReducer.projects.find(project => project.id === projectId)?.tasks);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const url = new URL(window.location.href);
        const projectParam = url.searchParams.get('project');

        setProjectId(projectParam);
    }, [window.location.href]);

    useEffect(() => {
        if (projectId) {
            dispatch(getProject(+projectId));
            dispatch(getAllTasks(+projectId));
        }
    }, [projectId])

    return (
        <div className={styles.tasks}>
            <TaskNavigation projectId={+projectId} />

            <div className={styles.wrapper}>
                <Routes>
                    <Route path='/' element={<Kanban projectId={+projectId} />} />
                    <Route path='*' element={<NotFound fixed={false} />} />
                </Routes>
            </div>
        </div>
    );
}

export default Tasks;