import styles from './styles.module.sass';

import img from '@images/not_found.svg';

const NotFound = () => {
    return (
        <div className={styles.page}>
            <div className={styles.image}>
                <img src={img} alt="" />
            </div>
            <div className={styles.text}>
                It looks like we couldn't find the page you were looking for..
            </div>
        </div>
    );
}

export default NotFound;