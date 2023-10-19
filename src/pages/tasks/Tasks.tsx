import { useParams, Outlet } from 'react-router-dom'

import TaskNavigation from '../../components/taskNavigation/TaskNavigation';

import styles from './Tasks.module.sass';
import { useAppDispatch, useAppSelector } from '../../actions/redux';
import { useEffect } from 'react';
import { getAllTasks } from '../../actions/tasks';
import { commonSlice } from '../../store/reducers/commonSlice';


const Tasks = () => {
    const dispatch = useAppDispatch();
    const { projectId } = useParams();

    const project = useAppSelector(state => state.projectReducer.projects.find(pr => String(pr.id) === projectId));

    useEffect(() => {
        dispatch(commonSlice.actions.toggleParam({ param: "projectId", value: projectId ? Number(projectId) : null }))
    }, [window.location.href]);

    useEffect(() => {
        if (projectId && project && project.downloadedTasks !== "all") {
            dispatch(getAllTasks(+projectId));
        }
    }, [projectId, project])

    return (
        <div className={styles.tasks}>
            <TaskNavigation />

            <div className={styles.wrapper}>
                <Outlet context={project} />
            </div>
        </div>
    );
}

export default Tasks;