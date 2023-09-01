import styles from './styles.module.sass';

import img from '@images/error.svg';

const ErrorPage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.image}>
                <img src={img} alt="" />
            </div>
            <div className={styles.text}>
                <span>Oops!</span> Something went wrong..
            </div>
        </div>
    );
}

export default ErrorPage;