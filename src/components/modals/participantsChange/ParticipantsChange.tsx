import Overflow from '../../overflow/Overflow';

import { useAppDispatch } from '../../../actions/redux';

import s from '../index.module.sass';
import styles from './ParticipantsChange.module.sass';

import x from '@images/x.svg';
import { commonSlice } from '../../../store/reducers/commonSlice';

const ParticipantsChange = () => {

    const dispatch = useAppDispatch();

    const handleCloseModal = () => {
        dispatch(commonSlice.actions.toggleModal({ modalName: "projectParticipantsOpen", isOpen: false }))
    }

    return (
        <Overflow isCenter={true} close={handleCloseModal}>
            <div className={s.modal}>
                <button className={s.close} onClick={handleCloseModal}>
                    <img src={x} alt="close" />
                </button>
                <h3 className={s.title}>
                    Invite participants
                </h3>
            </div>
        </Overflow>
    );
}

export default ParticipantsChange;