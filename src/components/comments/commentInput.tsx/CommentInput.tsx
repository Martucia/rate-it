import { useState, useRef } from 'react';

import styles from './CommentInput.module.sass';
import { BASE_URL } from '../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../actions/redux';
import clip from '@images/clip.svg'
import emoji from '@images/emoji.svg'
import { createComment } from '../../../actions/comments';

interface CommentInput {
    taskId: number
}

const CommentInput = ({ taskId }: CommentInput) => {
    const avatar = useAppSelector(state => state.userReducer.user?.avatar);

    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const isLoading = useAppSelector(state => state.taskReducer.isLoading);

    const dispatch = useAppDispatch();

    const [value, setValue] = useState('');
    const [isFocus, setFocus] = useState(false)
    const [error, setError] = useState('')

    const toggleFocus = (isFocus: boolean) => {
        setFocus(isFocus)
    }

    const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const handleCancel = () => {
        setValue('');
        setFocus(false);
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.blur();
        }
    }

    const handleSendComment = async () => {

        if (value.length === 0) {
            setError("Your comment must not be empty");
            return;
        }

        const comment = {
            text: value,
            task: {
                id: taskId
            }
        }

        const result = await dispatch(createComment(comment));

        if (result) {
            handleCancel();
        }

    }

    const handleOnChange = (e: any) => {
        setError('');
        setValue(e.target.value);
    }

    return (
        <div className={`${isFocus ? styles.open_block : styles.block}`}>
            <div className={styles.avatar}>
                <img src={`${BASE_URL}/file/${avatar}`} alt="avatar" />
            </div>
            <textarea
                ref={inputRef}
                onFocus={() => toggleFocus(true)}
                className={styles.input}
                placeholder='Add a comment...'
                value={value}
                onInput={autoResize}
                onChange={handleOnChange}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key == 'Enter' && !e.shiftKey && !isLoading) {
                        e.preventDefault();
                        handleSendComment();
                    }
                }}
            />

            {isFocus &&
                <div className={styles.bottom}>
                    <div className={styles.btns}>
                        <button className={styles.btn}>
                            <img src={clip} alt="" />
                        </button>
                        <button className={styles.btn}>
                            <img src={emoji} alt="" />
                        </button>
                        <div className={styles.error}>
                            {error}
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <button className={styles.cancel} onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className={styles.save} onClick={handleSendComment}>
                            Save
                        </button>
                    </div>

                </div>
            }
        </div>
    );
}

export default CommentInput;