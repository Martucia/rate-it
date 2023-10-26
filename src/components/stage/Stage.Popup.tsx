import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../actions/redux';
import PopupHoc from '../../hoc/Popup';
import { deleteStage } from '../../actions/stages';

interface PopupProps {
    close: () => void,
    id: number,
    setEdit: () => void
}

const Popup: FC<PopupProps> = ({ close, id, setEdit }) => {
    const projectId = useAppSelector(state => state.commonReducer.projectId);

    const dispatch = useAppDispatch();

    const handleDeleteStage = () => {
        if (projectId) dispatch(deleteStage(id, projectId));
    }

    return (
        <PopupHoc close={close}>
            <button onClick={setEdit}>
                Edit
            </button>
            <button onClick={handleDeleteStage}>
                Delete
            </button>
        </PopupHoc>
    );
}

export default Popup;