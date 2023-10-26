import { FC } from 'react'
import PopupHoc from '../../../hoc/Popup';
import { useAppDispatch } from '../../../actions/redux';
import { deleteComment } from '../../../actions/comments';
import clipboardCopy from 'clipboard-copy';

interface PopupProps {
    close: () => void,
    id: number,
    setEdit: () => void,
    isOwner: boolean,
    text: string
}

const Popup: FC<PopupProps> = ({ close, id, setEdit, isOwner, text }) => {
    
    const dispatch = useAppDispatch();

    const handleDeleteComment = () => {
        dispatch(deleteComment(id));
    }

    const handleCopyText = () => {
        clipboardCopy(text)
    }

    return (
        <PopupHoc close={close}>
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
        </PopupHoc>
    );
}

export default Popup;