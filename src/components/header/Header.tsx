import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.sass';

import notification from '@images/notification.svg';
import avatar from '@images/avatar.png';
import settings from '@images/settings2.svg';
import logout from '@images/logout.svg';

const Header = () => {
    const [isOpen, setOpen] = useState(false);

    const userBlock = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userBlock.current && !userBlock.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.inputs}>
                <div className={`${styles.search} ${styles.input_block}`}>
                    <input placeholder='Seach' type="text" className={styles.input} />
                </div>
                <div className={`${styles.date} ${styles.input_block}`}>
                    <input type="date" className={styles.input} />
                </div>
            </div>

            <div className={styles.personal}>
                <button className={styles.notification}>
                    <img src={notification} alt="notification" />
                </button>

                <button onClick={() => setOpen(prev => !prev)} className={styles.user}>
                    <div className={styles.avatar}>
                        <img src={avatar} alt="avatar" />
                    </div>
                    <div className={styles.dots}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                {isOpen && (
                    <div ref={userBlock} className={styles.user_block}>
                        <NavLink to='/project/settings' onClick={() => setOpen(false)}>
                            <img src={settings} alt="" />
                            Settings
                        </NavLink>
                        <button>
                            <img src={logout} alt="" />
                            Log out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;