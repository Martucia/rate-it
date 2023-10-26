import { useState, FC } from 'react';

import styles from './NavMenu.module.sass';

import toggle from '@images/arrow.svg';
import plus from '@images/add_circle.svg'
import { useAppDispatch } from '../../actions/redux';
import { commonSlice } from '../../store/reducers/commonSlice';
import Link from './NavMenu.Link';

interface NavMenuSectionProps {
    section: any,
    type?: 'projects'
}

const NavMenuSection: FC<NavMenuSectionProps> = ({ section, type }) => {
    const [isOpen, setOpen] = useState(true);

    const dispatch = useAppDispatch();

    const handleOpenProjectCreate = () => {
        dispatch(commonSlice.actions.toggleParam({
            param: "projectCreateOpen",
            value: true
        }));
    }

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
                    <Link key={link.id} link={link} type={type} />
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