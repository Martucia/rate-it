import styles from './AboutUs.module.sass';

import img from '@images/logo_about.svg';

const AboutUs = () => {
    return (
        <section className={styles.section}>
            <h2 className="sec-title">
                About us
            </h2>
            <div style={{ margin: "20px 0 0" }} className="title-line"></div>

            <div className={styles.wrapper}>
                <div>
                    <p className={styles.text}>
                        Picture this….you’re in your weekly meeting and you ask a question.
                        No one responds. Whether they’re zoned out or are responding to emails or chatting
                        on slack, it can feel defeating.
                    </p>
                    <div className={styles.text}>
                        In order to have an epic meeting, you need five parts:
                        <ul className={styles.list}>
                            <li>Set a cadence for your team meetings</li>
                            <li>Have a clear meeting objective and agenda</li>
                            <li>Start on time and end on time</li>
                            <li>Have the right attendees in the room</li>
                            <li>Have clear action items [who, what, when] at the end of the meeting</li>
                        </ul>
                    </div>
                    <p className={styles.text}>
                        Rate It was created to help leaders and managers have epic meetings that aren’t wasting anyone’s time.
                        With timely feedback on how meetings can be productive, you will soon be holding world-class and super effective meetings.
                    </p>
                </div>
                <div className={styles.image}>
                    <img src={img} alt="" />
                </div>
            </div>
        </section>
    );
}

export default AboutUs;