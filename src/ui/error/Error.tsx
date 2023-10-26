import { FC } from 'react';

import styles from './Error.module.sass';

interface ErrorProps {
    error: string,
    style?: React.CSSProperties
}

const Error: FC<ErrorProps> = ({ error, style }) => {
    return (
        <div className={styles.error} style={style}>
            {error}
        </div>
    );
}

export default Error;