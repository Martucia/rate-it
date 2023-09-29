import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import styles from './NavMenu.module.sass';

import toggle from '@images/arrow.svg';
import plus from '@images/add_circle.svg'
import { useAppDispatch, useAppSelector } from '../../actions/redux';
import { commonSlice } from '../../store/reducers/commonSlice';


const NavMenuSection = ({ section }: any) => {
    const [isOpen, setOpen] = useState(true);

    const projectId = useAppSelector(state => state.commonReducer.projectId);

    const dispatch = useAppDispatch();

    const handleOpenProjectCreate = () => {
        dispatch(commonSlice.actions.toggleParam({
            param: "projectCreateOpen",
            value: true
        }));
    }

    const setClass = (link: any) => {
        const isActive = link.id === Number(projectId);
        return isActive ? `${styles.active} ${styles.link}` : styles.link;
    };

    return (
        <div className={styles.section}>
            <div className={styles.section_name}>
                <p>
                    {section.name.toUpperCase()}
                </p>
                <button className={styles.toggle} onClick={() => setOpen(!isOpen)}>
                    <img style={{ transform: `rotate(${isOpen ? "0deg" : "180deg"})` }} src={toggle} alt="" />
                </button>
            </div>
            <div className={`${styles.wrapper} ${!isOpen && styles.section_close}`}>
                {section.links.map((link: any) => (
                    <NavLink key={link.name} className={setClass(link)} to={link.link}>
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
                        <div className={styles.border}></div>
                    </NavLink>
                ))}

                {section.name.toLowerCase() == "projects" && (
                    <button onClick={handleOpenProjectCreate} className={styles.button}>
                        <img src={plus} alt="" />
                        <span className={styles.text}>
                            Add New Project
                        </span>
                    </button>
                )}
            </div>

        </div>
    );
}

export default NavMenuSection;