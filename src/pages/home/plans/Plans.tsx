import styles from './Plans.module.sass';

const Plans = () => {
    return (
        <section className={styles.plans}>
            <h2 className="sec-title" style={{ textAlign: "center" }}>
                Customizable plans for every company
            </h2>
            <div className="title-line"></div>

            <div className="sec-desc">
                With our scalable packages, you can pay for what you need and leave out what you don’t. We will grow with you.
                <span style={{ display: "block" }}>Figure out what package is best for you</span>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.block}>
                    <div className={styles.title}>
                        Free
                    </div>
                    <div className={styles.price}>
                        0
                    </div>
                    <div className={styles.list}>
                        <span>1 user 1 connected calendar</span>
                        <span>Up to 12 responses</span>
                        <span>Up to 3 survey results archived</span>
                        <span>Knowledge base</span>
                    </div>
                    <div className={styles.dots}>
                        ...
                    </div>
                    <button className={`${styles.btn} button-blue`}>
                        Get Free
                    </button>
                </div>
                <div className={styles.block}>
                    <div className={styles.title} style={{ color: "#fff" }}>
                        Personal
                    </div>
                    <div className={styles.price}>
                        5
                    </div>
                    <div className={styles.list}>
                        <span>1 user up to 2 connected calendars</span>
                        <span>Up to 50 responses</span>
                        <span>Up to 10 survey results archived</span>
                        <span>Standard email & chat</span>
                    </div>
                    <div className={styles.dots}>
                        ...
                    </div>
                    <button className={`${styles.btn} button`}>
                        Get Personal
                    </button>
                </div>
                <div className={styles.block}>
                    <div className={styles.title}>
                        Team
                    </div>
                    <div className={styles.price}>
                        10
                    </div>
                    <div className={styles.list}>
                        <span>Per user in company domain with single calender integrations</span>
                        <span>Unlimited responses</span>
                        <span>Unlimited survey results archived</span>
                        <span>Priority email & chat </span>
                    </div>
                    <div className={styles.dots}>
                        ...
                    </div>
                    <button className={`${styles.btn} button-blue`}>
                        Get Team
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Plans;