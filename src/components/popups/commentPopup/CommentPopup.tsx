import { useEffect, useRef } from 'react';

import styles from './CommentPopup.module.sass';
import s from '../index.module.sass';
import { useAppDispatch } from '../../../actions/redux';
import { ClickOutside } from '../../../utils/functions';
import { deleteComment } from '../../../actions/comments';

interface CommentPopupProps {
    close: () => void,
    id: number,
    setEdit: () => void
}

const CommentPopup = ({ close, id, setEdit }: CommentPopupProps) => {
    const popupRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    const handleDeleteComment = () => {
        dispatch(deleteComment(id));
    }

    useEffect(() => ClickOutside({ element: popupRef, close }))

    return (
        <div ref={popupRef} className={s.popup}>
            <button onClick={setEdit}>
                Edit
            </button>
            <button onClick={handleDeleteComment}>
                Delete
            </button>
        </div>
    );
}

export default CommentPopup;