import { FC, MouseEventHandler, useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavMenu.module.sass';
import Popup from './NavMenu.Popup';

interface LinkProps {
    link: any,
    type?: 'projects'
}

const Link: FC<LinkProps> = ({ link, type }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    return (
        <NavLink key={link.name} className={({ isActive }) => isActive ? `${styles.active} ${styles.link}` : styles.link} to={link.link}>
            <div className={styles.link_context}>
                <img src={link.image} alt="" />
                <span className={styles.text}>
                    {link.name}
                </span>
            </div>
            {link.count && link.count > 0
                && <div className={styles.count}>
                    {link.count}
                </div>
            }
            {type === 'projects' && (
                <button onClick={(e) => {
                    e.preventDefault();
                    setPopupOpen(true);
                }} className={styles.dots}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            )}

            {isPopupOpen && <Popup
                close={() => setPopupOpen(false)}
                projectId={link.id}
            />}

            <div className={styles.border}></div>
        </NavLink>
    );
}

export default Link;