import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { ClickOutside } from '../../utils/functions';

import SearchInput from '../../ui/inputs/searchInput/SearchInput';
import Avatar from '../../ui/avatar/Avatar';

import styles from './Header.module.sass';

import notification from '@images/notifications.svg';
import { useAppSelector } from '../../actions/redux';

import Popup from './Header.Popup';

const Header = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const firstName = useAppSelector(state => state.userReducer.user?.firstName);
    const avatar = useAppSelector(state => state.userReducer.user?.avatar);

    const setClass = ({ isActive }: { isActive: boolean }) => (isActive ? `${styles.active} ${styles.link}` : styles.link);

    return (
        <header className={styles.header}>
            <SearchInput paddingY={8} />

            <nav className={styles.nav}>
                <NavLink to="/tasks/" className={setClass}>
                    Tasks
                </NavLink>
                <NavLink to="/tasks/" className={setClass}>
                    Meets
                </NavLink>
                <NavLink to="/tasks/" className={setClass}>
                    Calendar
                </NavLink>
                <NavLink to="/tasks" className={setClass}>
                    Goals
                </NavLink>
            </nav>

            <div className={styles.personal}>
                <button className={styles.notification}>
                    <img src={notification} alt="notification" />
                </button>

                <div onClick={() => setPopupOpen(prev => !prev)} className={styles.user}>
                    <Avatar avatar={avatar} notifications={9} percentage={10} size={40} />

                    {firstName}

                    {isPopupOpen && (
                        <Popup close={() => setPopupOpen(false)} />
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;