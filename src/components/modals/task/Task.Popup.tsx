import { FC } from 'react'
import { useAppDispatch } from '../../../actions/redux';
import PopupHoc from '../../../hoc/Popup';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../../../actions/tasks';

interface PopupProps {
    close: () => void,
    id: number,
}

const Popup: FC<PopupProps> = ({ close, id }) => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleDeleteTask = async () => {
        const result = await dispatch(deleteTask(id));

        if (result) {
            navigate(-1);
        }
    }

    return (
        <PopupHoc close={close}>
            <button onClick={handleDeleteTask}>
                Delete
            </button>
        </PopupHoc>
    );
}

export default Popup;