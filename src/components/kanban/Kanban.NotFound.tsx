import { FC } from 'react';

import styles from './Kanban.module.sass';
import { NavLink } from 'react-router-dom';

import image from '@images/qst.png';

type ErrorItem = {
    title: string;
    description: string;
};

type ErrorsObject = Record<string, ErrorItem>;

const errors: ErrorsObject = {
    "NotFound": {
        title: "Project not found",
        description: "The project doesn't seem to exist or you don't have permission to access it."
    },
    "SmthHappend": {
        title: "Project not found",
        description: "The project doesn't seem to exist or you don't have permission to access it."
    }
}

interface ErrorProps {
    error: keyof ErrorsObject;
}

const NotFound: FC<ErrorProps> = ({ error }) => {

    return (
        <div className={styles.not_found}>
            <img style={{ maxWidth: 320 }} src={image} alt="" />
            <h3 className={styles.title}>
                {errors[error].title}
            </h3>
            <div className={styles.description}>
                {errors[error].description}
            </div>
            <NavLink to={'/tasks/'} className={styles.btn}>
                Go back to home
            </NavLink>
        </div>
    )
}

export default NotFound;