import styles from './Participants.module.sass';

import avatar from '@images/avatar.png';
import plus from '@images/pl.svg';
import { IUser } from '../../types/user';
import { useAppDispatch } from '../../actions/redux';
import { commonSlice } from '../../store/reducers/commonSlice';

interface ParticipantProps {
    image: string,
    firstName: string,
    zIndex: number
}

const Participant = ({ image, firstName, zIndex }: ParticipantProps) => {
    return (
        <div style={{ zIndex: zIndex }} className={styles.participant}>
            <div className={styles.participant_inner}>
                <img src={image} alt={firstName} />
            </div>
        </div>
    );
}

interface ParticipantsProps {
    max: number,
    participants: IUser[],
    type: string,
    id: number
}

const Participants = ({ max, participants, id, type }: ParticipantsProps) => {

    const users: IUser[] = participants?.length > 5 ? participants.slice(0, 4) : participants;

    const dispatch = useAppDispatch();

    const handleOpenModal = () => {
        dispatch(commonSlice.actions.openParticipantsModal({ type, id }))
    }

    if (participants) return (
        <div className={styles.participants}>
            <div className={styles.list}>
                {users.map((user, index) => <Participant
                    key={index}
                    firstName={user.firstName}
                    image={avatar}
                    zIndex={index}
                />)}
                {participants.length > max
                    && <div className={styles.more}>
                        +{max}
                    </div>
                }
            </div>

            <button onClick={handleOpenModal} className={styles.plus}>
                <img src={plus} alt="plus" />
            </button>
        </div>
    );
}

export default Participants;