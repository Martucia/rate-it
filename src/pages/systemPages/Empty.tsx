import styles from './styles.module.sass';

import img from '@images/empty.svg';

const Empty = ({ fixed = true }) => {
    return (
        <div className={`${styles.page}  ${fixed && styles.fixed}`}>
            <div className={styles.image}>
                <img src={img} alt="" />
            </div>
            <div style={{ fontSize: "16px" }} className={styles.text}>
                Currently you don’t have any meetings synced on your dashboard.
                Connect your calendar to begin!
            </div>
            <button style={{ maxWidth: "230px", padding: "18px 0", fontSize: "16px" }} className="button-blue">
                Sync my calendar
            </button>
        </div >
    );
}

export default Empty;