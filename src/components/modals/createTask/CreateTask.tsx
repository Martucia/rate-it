import Overflow from '../../overflow/Overflow';

import styles from './CreateTask.module.sass';
import s from '../index.module.sass';

import x from '@images/x.svg';

const CreateTask = () => {

    const handleCloseModal = () => {

    }

    return (
        <Overflow isCenter={true}>
            <div className={s.modal}>
                <button className={s.close} onClick={handleCloseModal}>
                    <img src={x} alt="close" />
                </button>
                <h3 className={s.title}>
                    Create Task
                </h3>
            </div>
        </Overflow>
    );
}

export default CreateTask;