import styles from './HowItWorks.module.sass';

// import { ReactComponent as Img1 } from '@images/hiw1.svg';
import img1 from '@images/hiw1.svg'
import img2 from '@images/hiw2.svg'
import img3 from '@images/hiw3.svg'

const HowItWorks = () => {
    return (
        <section className={styles.section}>
            <h2 className="sec-title" style={{ textAlign: "center" }} >
                How it works?
            </h2>
            <div className='title-line'></div>

            <div className={styles.wrapper}>
                <div className={styles.block}>
                    <div className={styles.image}>
                        <img src={img1} alt="" />
                    </div>
                    <div className={styles.title}>
                        Click Google integration
                    </div>
                    <div className={styles.desc}>
                        Simply log into your google account,
                        then seamlessly integrate and
                        mirror your planned meetings.
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.image}>
                        <img src={img2} alt="" />
                    </div>
                    <div className={styles.title}>
                        Customization
                    </div>
                    <div className={styles.desc}>
                        Whatever the goals of your team or organization,
                        create a survey to better help you
                        understand the minds of those involved.
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.image}>
                        <img src={img3} alt="" />
                    </div>
                    <div className={styles.title}>
                        Automation
                    </div>
                    <div className={styles.desc}>
                        Automatically triggered emails
                        obtain survey feedback. Wait for meeting data
                        to be cleanly organized in your dashboard.
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;