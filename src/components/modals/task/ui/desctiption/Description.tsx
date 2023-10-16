import React, { useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '../../../../../actions/redux';
import { updateTask } from '../../../../../actions/tasks';

import styles from './Description.module.sass';

import done from '@images/done.svg'
import x from '@images/x.svg';
import rows from '@images/rows.svg'
import emoji from '@images/emoji.svg'


interface DescriptionProps {
    desc: string,
    taskId: number
}

const Description = ({ desc, taskId }: DescriptionProps) => {
    const [isEditing, setEditing] = useState(false);
    const [value, setValue] = useState(desc);

    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const dispatch = useAppDispatch();

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const handleSave = async () => {
        const result = await dispatch(updateTask({
            id: taskId,
            description: value.trim()
        }))

        if (result) {
            setEditing(false);
        }
    }

    const handleCancel = () => {
        setValue(desc);
        setEditing(false);
    }

    const textOut = desc.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));

    useEffect(() => {
        if (inputRef.current && isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing])

    return (
        <div className={`${styles.desc} ${isEditing && styles.editing}`}>
            {isEditing
                ?
                <>
                    <div className={styles.block}>
                        <textarea
                            ref={inputRef}
                            className={styles.input}
                            value={value}
                            onChange={handleOnChange}
                            onKeyDown={(e) => {
                                if (e.key == 'Enter' && !e.shiftKey) {
                                    handleSave();
                                }
                            }}
                            onInput={autoResize}
                            onFocus={autoResize}
                            placeholder='Enter description'
                        />

                        <div className={styles.bottom}>
                            <div className={styles.btns}>
                                <button className={styles.btn}>
                                    <img src={emoji} alt="" />
                                </button>
                            </div>
                            <div className={styles.btns}>
                                <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
                                    <img src={x} alt="" />
                                </button>
                                <button onClick={handleSave} className={`${styles.btn} ${styles.save}`}>
                                    <img src={done} alt="" />
                                </button>
                            </div>
                        </div>

                    </div>
                </>
                : <div className={styles.content} onClick={() => setEditing(true)}>
                    {desc.length === 0
                        ? <span className={styles.empty}>
                            <img src={rows} alt="" /> Description
                        </span>
                        : <>{textOut}</>
                    }
                </div>
            }

        </div>
    );
}



export default Description;