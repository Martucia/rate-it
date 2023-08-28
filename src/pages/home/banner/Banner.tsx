import styles from './Banner.module.sass';

import img from '@images/banner_img.png';

const Banner = () => {
    return (
        <section className={styles.banner}>
            <div>
                <h1 className={styles.title}>
                    Stop wasting time <span>in meetings</span>
                </h1>
                <div className={styles.subtitle}>
                    Boost efficiency, save time & money with post meeting surveys.
                </div>
                <div className={styles.btns}>
                    <button className={`${styles.btn} button-blue`}>Get Started</button>
                    <button className={`${styles.btn} button`}>Sign up with Google</button>
                </div>
            </div>
            <div className={styles.image}>
                <img src={img} alt="" />
            </div>
        </section>
    );
}

export default Banner;