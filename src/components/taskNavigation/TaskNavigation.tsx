import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../actions/redux';
import { commonSlice } from '../../store/reducers/commonSlice';

import Title from '../title/Title';
import Participants from '../participants/Participants';
import SearchInput from '../searchInput/SearchInput';

import styles from './TaskNavigation.module.sass';

import board from '@images/board.svg'
import list from '@images/list.svg'
import edit from '@images/board_edit.svg'

interface TaskNavigationProps {
    projectId: number
}

const TaskNavigation = ({ projectId }: TaskNavigationProps) => {
    const view = useAppSelector(state => state.commonReducer.tasksView);
    const participants = useAppSelector(state => state.projectReducer.projects.find(project => project.id === projectId)?.participants);

    const setClass = ({ isActive }: { isActive: boolean }) => (isActive ? `${styles.active} ${styles.link}` : styles.link);

    const dispatch = useDispatch();

    const changeViewHandle = (view: string) => {
        dispatch(commonSlice.actions.changeView({ view }));
    };

    return (
        <>
            <div className={styles.navigation}>
                <Title isEdited={true} id={projectId} />

                <nav className={styles.nav}>
                    <NavLink to='/tasks/' className={setClass}>
                        Kanban
                    </NavLink>
                    <NavLink to='/tasks/calendar' className={setClass}>
                        Calendar
                    </NavLink>
                    <NavLink to='/tasks/dashboard' className={setClass}>
                        Dashboard
                    </NavLink>
                    <NavLink to='/tasks/progress' className={setClass}>
                        Progress
                    </NavLink>
                    <NavLink to='/tasks/more' className={setClass}>
                        More
                    </NavLink>
                </nav>

                <Participants type="project" id={projectId} participants={participants || []} max={5} />
            </div>
            <div className={styles.filter}>
                <div className={styles.views}>
                    <button onClick={() => changeViewHandle("board")} className={view === "board" ? styles.active : ""}>
                        <img src={board} alt="" />
                        <span>
                            Board View
                        </span>
                    </button>
                    <button onClick={() => changeViewHandle("list")} className={view === "list" ? styles.active : ""}>
                        <img src={list} alt="" />
                        <span>
                            List View
                        </span>
                    </button>
                </div>

                <div style={{ display: "flex", gap: 32 }}>
                    <SearchInput paddingY={10} maxContent={true} />

                    <div className={styles.btns}>
                        <button>
                            <img src={edit} alt="edit" />
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default TaskNavigation;