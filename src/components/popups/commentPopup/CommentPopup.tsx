import { useEffect, useRef } from 'react';

import s from '../index.module.sass';
import { useAppDispatch } from '../../../actions/redux';
import { ClickOutside } from '../../../utils/functions';
import { deleteComment } from '../../../actions/comments';
import clipboardCopy from 'clipboard-copy';

interface CommentPopupProps {
    close: () => void,
    id: number,
    setEdit: () => void,
    isOwner: boolean,
    text: string
}

const CommentPopup = ({ close, id, setEdit, isOwner, text }: CommentPopupProps) => {
    const popupRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    const handleDeleteComment = () => {
        dispatch(deleteComment(id));
    }

    const handleCopyText = () => {
        clipboardCopy(text)
            // .then(() => {
            //     dispatch(setNotification(`Текст скопійовано в буфер обміну`, true));
            // })
            // .catch(err => {
            //     dispatch(setNotification(`Помилка при копіюванні: ${err}`, false));
            // });
    }

    useEffect(() => ClickOutside({ element: popupRef, close }))

    return (
        <div ref={popupRef} className={s.popup}>
            {isOwner
                ? <>
                    <button onClick={setEdit}>
                        Edit
                    </button>
                    <button onClick={handleDeleteComment}>
                        Delete
                    </button>
                </>
                : <>
                    <button onClick={handleCopyText}>
                        Copy
                    </button>
                </>
            }

        </div>
    );
}

export default CommentPopup;