import List from './Kanban.List';
import { useAppSelector } from '../../actions/redux';
import Board from './Kanban.Board';
import { IProject } from '../../types/project';
import { useMemo } from 'react'
import { sortItems } from '../../hooks/sort';
import { ITask } from '../../types/task';
import Empty from './Kanban.Empty';

const Kanban = () => {

    const { tasksView, projectId } = useAppSelector(state => state.commonReducer);

    const project = useAppSelector<IProject | undefined>(state =>
        state.projectReducer.projects.find(project => project.id === projectId)
    );

    const tasksSelector = useAppSelector<ITask[]>(state => state.taskReducer.tasks.filter(task => task.project?.id === projectId));


    const stages = useMemo(() => sortItems(project?.stages, "index"), [project?.stages]);
    const tasks = useMemo(() => tasksSelector && projectId ? sortItems(tasksSelector, "index", 'project.id', projectId) : [], [tasksSelector]);

    console.log(tasks)

    if (tasks && tasks.length === 0) return <Empty />

    if (tasksView === "list" && tasks) return <List tasks={tasks} />


    if (projectId && stages && tasks) return <Board
        projectId={projectId}
        currentStages={stages}
        currentTasks={tasks}
    />
}

export default Kanban;