import { useEffect, useRef } from 'react';
import styles from './StagePopup.module.sass';
import s from '../index.module.sass';
import { ClickOutside } from '../../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../../actions/redux';
import { deleteStage } from '../../../actions/stages';

interface StagePopupProps {
    close: () => void,
    id: number,
    setEdit: () => void
}

const StagePopup = ({ close, id, setEdit }: StagePopupProps) => {
    const projectId = useAppSelector(state => state.commonReducer.projectId);

    const popupRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => ClickOutside({ element: popupRef, close }), []);

    const handleDeleteStage = () => {
        if (projectId) {
            dispatch(deleteStage(id, projectId));
        }
    }

    return (
        <div ref={popupRef} className={s.popup}>
            <button onClick={setEdit}>
                Edit
            </button>
            <button onClick={handleDeleteStage}>
                Delete
            </button>
        </div>

    );
}

export default StagePopup;