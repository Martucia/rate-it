import { Routes, Route, useParams } from 'react-router-dom'

import TaskNavigation from '../../components/taskNavigation/TaskNavigation';
import Kanban from '../../components/tasks/kanban/Kanban';
import NotFound from '../systemPages/404';

import styles from './Tasks.module.sass';
import { useAppDispatch, useAppSelector } from '../../actions/redux';
import { useEffect, useState } from 'react';
import { getAllTasks } from '../../actions/tasks';
import { commonSlice } from '../../store/reducers/commonSlice';
import Task from '../../components/modals/task/Task';


const Tasks = () => {
    const [projectIdCurrent, setProjectIdCurrent] = useState<number | null>(null);
    const project = useAppSelector(state => state.projectReducer.projects.find(pr => pr.id === projectIdCurrent));

    const dispatch = useAppDispatch();
    const { projectId } = useParams();

    useEffect(() => {
        setProjectIdCurrent(projectId ? +projectId : null);
        dispatch(commonSlice.actions.toggleParam({ param: "projectId", value: Number(projectId) }))
    }, [window.location.href]);

    useEffect(() => {

        if (projectId && project && project.downloadedTask !== "all") {
            dispatch(getAllTasks(+projectId));
        }
    }, [projectId, project])

    return (
        <div className={styles.tasks}>
            <TaskNavigation projectId={projectIdCurrent} />

            <div className={styles.wrapper}>
                <Routes>
                    <Route
                        path='/*'
                        element={
                            <Kanban
                                projectId={projectIdCurrent}
                            />
                        }
                    />
                    <Route path='*' element={<NotFound fixed={false} />} />
                </Routes>
            </div>
        </div>
    );
}

export default Tasks;