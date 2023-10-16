import { MouseEventHandler } from 'react';

import styles from './NavMenu.module.sass';

import NavMenuSection from './NavMenuSection';

import inboxImg from '@images/inbox.svg';
import tag from '@images/tag.svg';
import open from '@images/menu_open.svg';
import anl from '@images/nav_anl.svg';
import settings from '@images/nav_settings.svg'
import { useAppSelector } from '../../actions/redux';

interface NavMenuProps {
    toggle: MouseEventHandler<HTMLButtonElement>,
    isOpen: boolean
}

const sections = [
    {
        name: "Dashboards",
        links: [
            {
                name: "My tasks",
                image: inboxImg,
                link: "/tasks/",
                count: 4
            },
            {
                name: "Drive Files",
                image: inboxImg,
                link: "/tasks/files",
                count: 6
            },
            {
                name: "Analytics",
                image: anl,
                link: "/tasks/analytics/"
            },
            {
                name: "Settings",
                image: settings,
                link: "/tasks/settings",

            },
        ]
    }
]

const NavMenu = ({ toggle, isOpen }: NavMenuProps) => {
    const projects = useAppSelector(state => state.projectReducer.projects);

    const projectSection = {
        name: "Projects",
        links: projects.map(project => ({
            name: project.name,
            image: tag,
            link: `/project/${project.id}`,
            id: project.id
        }))
    }

    return (
        <div className={`${styles.nav_menu} ${!isOpen && styles.close}`}>
            <div className={styles.title}>
                <span className={styles.text}>
                    Dashboard
                </span>

                <button className={styles.toggle} onClick={toggle}>
                    <img src={open} alt="" />
                </button>
            </div>

            <nav className={styles.nav}>
                {sections.map(section => <NavMenuSection key={section.name} section={section} />)}
                <NavMenuSection key={projectSection.name} section={projectSection} />
            </nav>
        </div>
    );
}

export default NavMenu;