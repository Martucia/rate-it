import React, { useState, useRef, useEffect } from 'react';
import { BASE_URL } from '../../../utils/constants';
import { formatDateAndTime } from '../../../utils/functions';

import styles from './Comment.module.sass';
import CommentPopup from '../../popups/commentPopup/CommentPopup';
import { useAppDispatch } from '../../../actions/redux';
import { updateComment } from '../../../actions/comments';

interface CommentProps {
    id: number,
    firstName: string,
    avatar: string,
    text: string,
    createdAt: Date
}

const Comment = ({ id, firstName, avatar, text, createdAt }: CommentProps) => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [value, setValue] = useState(text);
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const textOut = text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));

    const handleCancelEdit = () => {
        setValue(text);
        setEditing(false);
    }

    const handleSave = async () => {
        if (value.length === 0) {
            setError("Your comment must not be empty");
            return;
        }

        const response = await dispatch(updateComment({
            id,
            text: value.trim()
        }));

        if (response) {
            setEditing(false);
        }
    }

    const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const handleSetEdit = () => {
        setPopupOpen(false);
        setEditing(true);
    }

    useEffect(() => {
        if (inputRef.current && isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing])


    return (
        <div className={`${styles.comment} ${isPopupOpen && styles.open} ${isEditing && styles.editing}`}>
            <div className={styles.user}>
                <div className={styles.avatar}>
                    <img src={`${BASE_URL}/file/${avatar}`} alt="avatar" />
                </div>
                <span className={styles.name}>
                    {firstName}
                </span>
            </div>
            {isEditing
                ? <div className={styles.content}>
                    <textarea
                        ref={inputRef}
                        value={value}
                        onChange={(e: any) => setValue(e.target.value)}
                        onInput={autoResize}
                        onFocus={autoResize}
                        className={styles.input}
                        placeholder='Add a comment...'
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                            if (e.key == 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSave();
                            }
                        }}
                    />
                    <div className={styles.bottom}>
                        <div className={styles.error}>
                            {error}
                        </div>

                        <div className={styles.btns}>
                            <button className={styles.cancel} onClick={handleCancelEdit}>
                                Cancel
                            </button>
                            <button className={styles.save} onClick={handleSave}>
                                Save
                            </button>
                        </div>

                    </div>
                </div>
                : <div className={styles.content}>
                    <div className={styles.text}>
                        {textOut}
                    </div>
                    <div className={styles.date}>
                        {formatDateAndTime(createdAt)}
                    </div>
                </div>
            }

            <div className={styles.options}>
                <button className={styles.dots} onClick={() => setPopupOpen(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                {isPopupOpen && <CommentPopup
                    close={() => setPopupOpen(false)}
                    id={id}
                    setEdit={handleSetEdit}
                />}
            </div>

        </div >
    );
}

export default Comment;