import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'

import styles from './Project.module.sass';

import Header from '../../components/header/Header';
import NavMenu from '../../components/navMenu/NavMenu';
import Meetings from '../meetings/Meetings';
import NotFound from '../systemPages/404';
import Error from '../systemPages/400';
import Soon from '../systemPages/Soon';
import Tasks from '../tasks/Tasks';

const Project = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === '/project/' || window.location.pathname === '/project') {
            navigate('/project/tasks', { replace: true });
        }
    }, []);

    return (
        <div className={styles.project}>
            <NavMenu />

            <div className={styles.wrapper}>
                <Header />

                <Routes>
                    <Route path='/overview' element={<Meetings />} />
                    <Route path='/tasks' element={<Tasks />} />
                    <Route path='/insights' element={<Soon fixed={false} />} />
                    <Route path='/templates' element={<Soon fixed={false} />} />
                    <Route path='/membership' element={<Soon fixed={false} />} />
                    <Route path='/settings' element={<Soon fixed={false} />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='/error' element={<Error />} />
                </Routes>
            </div>
        </div>
    );
}

export default Project;