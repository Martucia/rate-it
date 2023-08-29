// import CircleSlider from '../../../components/slider/Slider';
import styles from './WhyItsImportant.module.sass';

const WhyItsImportant = () => {
    return (
        <section className={styles.section}>
            <h2 className="sec-title" style={{ textAlign: "center" }} >
                Why it’s important?
            </h2>

            <div className='title-line'></div>

            <div className={`${styles.desc} sec-desc`}>
                How many hours are you and your team wasting in meetings that aren’t adding to your productivity?
                In a 2017 survey of office workers by the <span>Harvard Business Review</span>, key findings brought to light how useless meetings can actually be.
            </div>

            <div className={styles.wrapper}>
                {/* <CircleSlider /> */}
                wrapper
            </div>

            <div className={`${styles.desc} sec-desc`}>
                Feeling like there aren’t enough hours in the day is a common problem faced by many leaders in this world.
                <span style={{ display: "block", width: "100%" }}>Try post meeting surveys now and avoid wasting time.</span>
            </div>

            <button className={`button-blue ${styles.btn}`}>
                Sign up today
            </button>
        </section>
    );
}

export default WhyItsImportant;