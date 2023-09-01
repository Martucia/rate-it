import styles from './styles.module.sass';

import img from '@images/success.svg';

const Success = () => {
    return (
        <div className={styles.page}>
            <div className={styles.image}>
                <img src={img} alt="" />
            </div>
        </div>
    );
}

export default Success;