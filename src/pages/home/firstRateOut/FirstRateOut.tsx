import { NavLink } from 'react-router-dom';

import styles from './FirstRateOut.module.sass';

// import img from '@images/banner.png';

const FirstRateOut = () => {
    return (
        <section className={styles.section}>
            <h2 className="sec-title" style={{ maxWidth: "404px" }}>
                Send out your first
                Rate It today!
            </h2>
            <NavLink className={`${styles.link} button-blue`} to="/reg">
                Try for free
            </NavLink>
        </section>
    );
}

export default FirstRateOut;