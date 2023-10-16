import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { ClickOutside } from '../../utils/functions';

import SearchInput from '../searchInput/SearchInput';
import Avatar from '../avatar/Avatar';

import styles from './Header.module.sass';

import notification from '@images/notifications.svg';
import settings from '@images/settings2.svg';
import logout from '@images/logout.svg';
import { useAppDispatch, useAppSelector } from '../../actions/redux';
import { userSlice } from '../../store/reducers/userSlice';

const Header = () => {
    const [isOpen, setOpen] = useState(false);

    const firstName = useAppSelector(state => state.userReducer.user?.firstName);
    const avatar = useAppSelector(state => state.userReducer.user?.avatar);

    const dots = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => ClickOutside({ element: dots, close: setOpen }), []);

    const setClass = ({ isActive }: { isActive: boolean }) => (isActive ? `${styles.active} ${styles.link}` : styles.link);

    return (
        <header className={styles.header}>
            <SearchInput paddingY={8} />

            <nav className={styles.nav}>
                <NavLink to="/tasks" className={setClass}>
                    Dashboard
                </NavLink>
                <NavLink to="/tasks" className={setClass}>
                    My Tasks
                </NavLink>
                <NavLink to="/tasks" className={setClass}>
                    My Tasks
                </NavLink>
                <NavLink to="/tasks" className={setClass}>
                    Reporting
                </NavLink>
                <NavLink to="/tasks" className={setClass}>
                    Portfolios
                </NavLink>
                <NavLink to="/tasks" className={setClass}>
                    Goals
                </NavLink>
            </nav>

            <div className={styles.personal}>
                <button className={styles.notification}>
                    <img src={notification} alt="notification" />
                </button>

                <div ref={dots} onClick={() => setOpen(prev => !prev)} className={styles.user}>
                    <Avatar avatar={avatar} notifications={9} percentage={10} size={40} />

                    {firstName}

                    {isOpen && (
                        <div className={styles.user_block}>
                            <NavLink  to='/tasks/settings' onClick={() => setOpen(false)}>
                                <img src={settings} alt="" />
                                Settings
                            </NavLink>
                            <button onClick={() => dispatch(userSlice.actions.logOut())}>
                                <img src={logout} alt="" />
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;