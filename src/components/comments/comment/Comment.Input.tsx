import { useState, useRef, FC, useEffect } from 'react';

import styles from './CommentInput.module.sass';
import { BASE_URL } from '../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../actions/redux';
import emoji from '@images/emoji.svg'
import { createComment, updateComment } from '../../../actions/comments';
import FileBtn from '../../../ui/fileBtn/FileBtn';
import FilesList from '../../filesList/FilesList';
import { IComment, ICommentCreate } from '../../../types/comment';
import EmojiPopup from '../../popups/emojiPopup/EmojiPopup';
import { EmojiClickData } from 'emoji-picker-react';

interface CommentInput {
    taskId?: number,
    comment?: IComment,
    closeEditing?: () => void,
    send?: (comment: ICommentCreate) => void
}

const CommentInput: FC<CommentInput> = ({ taskId, comment = null, closeEditing, send }) => {
    const avatar = useAppSelector(state => state.userReducer.user?.avatar);

    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const isLoading = useAppSelector(state => state.taskReducer.isLoading);

    const dispatch = useAppDispatch();

    const [value, setValue] = useState<string>(comment ? comment.text : '');
    const [files, setFiles] = useState<File[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>(comment ? comment.files : []);
    const [isFocus, setFocus] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [isEmojiOpen, setEmojiOpen] = useState<boolean>(false);

    const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const toggleFocus = (e: React.ChangeEvent<HTMLTextAreaElement>, isFocus: boolean) => {
        setFocus(isFocus);
        autoResize(e);
    }

    const handleCancel = () => {

        if (comment && closeEditing) {
            closeEditing();
        } else {
            setValue('');
            setFiles([]);
            setFocus(false);
            if (inputRef.current) {
                inputRef.current.style.height = 'auto';
                inputRef.current.blur();
            }
        }
    }

    const handleFileInputDelete = (file: File) => {
        setFiles(prev => prev.filter(f => f !== file));

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

    };

    const handleUploadedFileInputDelete = (file: string) => {
        setUploadedFiles(prev => prev.filter(f => f !== file));
    };

    const handleSendComment = async () => {

        if (value.length === 0) {
            setError("Your comment must not be empty");
            return;
        }

        let result = null;

        if (comment) {

            result = await dispatch(updateComment({
                comment: {
                    id: comment.id,
                    text: value.trim(),
                    files: uploadedFiles
                },
                files
            }));

        } else if (taskId) {

            const commentToSave = {
                comment: {
                    text: value.trim(),
                    task: {
                        id: taskId
                    },
                },
                files
            }

            result = await dispatch(createComment(commentToSave));
            // send(commentToSave)

        }

        if (result) {
            handleCancel();
        }

    }

    const handleOnChange = (e: any) => {
        setError('');
        setValue(e.target.value);
    }

    useEffect(() => {
        if (comment && inputRef.current) {
            inputRef.current.focus();
            const valueLength = inputRef.current.value.length;
            inputRef.current.setSelectionRange(+valueLength, +valueLength);
        }
    }, [])

    return (
        <div className={`${styles.block} ${isFocus && !comment && styles.open_block}`}>
            {comment &&
                <div className={styles.avatar}>
                    <img src={`${BASE_URL}/file/${avatar}`} alt="avatar" />
                </div>
            }

            {taskId && !isFocus &&
                <div className={styles.avatar}>
                    <img src={`${BASE_URL}/file/${avatar}`} alt="avatar" />
                </div>
            }

            <div className={styles.content}>
                <textarea
                    ref={inputRef}
                    onFocus={(e) => toggleFocus(e, true)}
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

                {(isFocus || comment) &&
                    <>
                        {uploadedFiles.length > 0 &&
                            <FilesList
                                updatedFiles={uploadedFiles}
                                remove={handleUploadedFileInputDelete}
                            />
                        }
                        <FilesList
                            files={files}
                            remove={handleFileInputDelete}
                        />

                        <div className={styles.bottom}>
                            <div className={styles.btns}>
                                <FileBtn
                                    setFiles={setFiles}
                                    style={styles.btn}
                                    fileInputRef={fileInputRef}
                                />
                                <button onClick={() => setEmojiOpen(!isEmojiOpen)} className={styles.btn}>
                                    <img src={emoji} alt="" />
                                </button>
                                <div className={styles.error}>
                                    {error}
                                </div>
                                {isEmojiOpen && <EmojiPopup
                                    close={() => setEmojiOpen(false)}
                                    changeValue={(emoji: EmojiClickData) =>
                                        setValue(prev => prev + emoji)
                                    }
                                />}
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
                    </>
                }
            </div>

        </div>
    );
}

export default CommentInput;