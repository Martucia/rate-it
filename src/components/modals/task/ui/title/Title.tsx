import { useState } from 'react';

import { useAppDispatch } from '../../../../../actions/redux';
import { updateTask } from '../../../../../actions/tasks';

import styles from './Title.module.sass';

import done from '@images/done.svg'
import x from '@images/x.svg';
import Error from '../../../../../ui/error/Error';

interface TitleProps {
    title: string,
    taskId: number
}

const Title = ({ title, taskId }: TitleProps) => {
    const [isEditing, setEditing] = useState(false);
    const [value, setValue] = useState(title);
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        setValue(e.target.value);
    }

    const handleSaveTitle = async () => {
        if (value.length === 0) {
            setError('Title must be not empty');
            return;
        }

        const result = await dispatch(updateTask({
            id: taskId,
            title: value
        }))

        if (result) {
            setEditing(false);
        }
    }

    const handleCancel = () => {
        setValue(title);
        setEditing(false);
        setError('');
    }

    return (
        <div className={`${styles.title} ${isEditing && styles.editing}`}>
            {isEditing
                ?
                <>
                    <div className={styles.block}>
                        <input
                            type="text"
                            className={styles.input}
                            value={value}
                            onChange={handleOnChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSaveTitle();
                                }
                            }}
                            placeholder='Enter task title'
                        />
                        <div className={styles.btns}>
                            <button onClick={handleCancel} className={styles.btn}>
                                <img src={x} alt="" />
                            </button>
                            <button onClick={handleSaveTitle} className={styles.btn}>
                                <img src={done} alt="" />
                            </button>
                        </div>
                    </div>
                    
                    <Error error={error} />
                </>
                : <span onClick={() => setEditing(true)}>
                    {title}
                </span>
            }

        </div>
    );
}

export default Title;