import List from './Kanban.List';
import { useAppSelector } from '../../actions/redux';
import Board from './Kanban.Board';
import { IProject } from '../../types/project';
import { useMemo } from 'react'
import { sortItems } from '../../hooks/sort';
import { ITask } from '../../types/task';
import Empty from './Kanban.Empty';
import Error from './Kanban.NotFound';
import { useOutletContext } from 'react-router-dom';

const Kanban = () => {

    const { tasksView, projectId, isStageCreateOpen } = useAppSelector(state => state.commonReducer);
    const error = useAppSelector(state => state.projectReducer.error);

    const { project } = useOutletContext() as { project: IProject }

    // const project = useAppSelector<IProject | undefined>(state =>
    //     state.projectReducer.projects.find(project => project.id === projectId)
    // );

    const tasks = useAppSelector<ITask[]>(state => state.taskReducer.tasks.filter(task => task.project.id === projectId));

    const stages = useMemo(() => sortItems(project?.stages, "index"), [project?.stages]);

    if (!project) return <Error error={'NotFound'} />

    if (error) return <Error error={error} />

    if (stages && stages.length === 0 && !isStageCreateOpen) return <Empty />

    if (tasksView === "list" && tasks) return <List tasks={tasks} />

    if (projectId && stages && tasks) return <Board
        projectId={projectId}
        currentStages={stages}
        currentTasks={tasks}
    />
}

export default Kanban;