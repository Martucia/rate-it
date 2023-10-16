import { useEffect, useRef } from 'react';

import s from '../index.module.sass';
import { useAppDispatch } from '../../../actions/redux';
import { ClickOutside } from '../../../utils/functions';
import { deleteTask } from '../../../actions/tasks';
import { useNavigate } from 'react-router-dom';

interface CommentPopupProps {
    close: () => void,
    id: number,
}

const TaskPopup = ({ close, id }: CommentPopupProps) => {
    const popupRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleDeleteTask = async () => {
        const result = await dispatch(deleteTask(id));

        if (result) {
            navigate(-1);
        }
    }

    useEffect(() => ClickOutside({ element: popupRef, close }))

    return (
        <div ref={popupRef} className={s.popup}>
            <button onClick={handleDeleteTask}>
                Delete
            </button>
        </div>
    );
}

export default TaskPopup;