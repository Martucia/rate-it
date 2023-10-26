import { FC } from 'react'
import { useAppDispatch } from '../../actions/redux';
import { deleteProject } from '../../actions/projects';
import PopupHoc from '../../hoc/Popup';

interface PopupProps {
    projectId: number,
    close: () => void,
}

const Popup: FC<PopupProps> = ({ projectId, close }) => {

    const dispatch = useAppDispatch();

    const handleDeleteProject = (e: any) => {
        e.preventDefault();
        dispatch(deleteProject(projectId));
    }

    return (
        <PopupHoc close={close}>
            <button onClick={handleDeleteProject}>
                Delete
            </button>
        </PopupHoc>
    );
}

export default Popup;