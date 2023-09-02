import styles from './styles.module.sass';

import img from '@images/coming_soon.svg';

const Soon = ({ fixed = true }) => {
    return (
        <div className={`${styles.page}  ${fixed && styles.fixed}`}>
            <div className={styles.image}>
                <img src={img} alt="" />
            </div>
            <div className={styles.text}>
                Cooming soon
            </div>
        </div>
    );
}

export default Soon;