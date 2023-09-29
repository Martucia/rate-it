import styles from './Participants.module.sass';
import plus from '@images/pl.svg';
import { IParticipant } from '../../types/user';
import { useAppDispatch } from '../../actions/redux';
import { commonSlice } from '../../store/reducers/commonSlice';
import { BASE_URL } from '../../utils/constants';

interface ParticipantProps {
    image: string | null,
    firstName: string,
    zIndex: number
}

const Participant = ({ image, firstName, zIndex }: ParticipantProps) => {
    return (
        <div style={{ zIndex: zIndex }} className={styles.participant}>
            <div className={styles.participant_inner}>
                <img src={`${BASE_URL}/file/${image}`} alt={firstName} />
            </div>
        </div>
    );
}

interface ParticipantsProps {
    max: number,
    participants: IParticipant[],
    type: string,
    id: number | null
}

const Participants = ({ max, participants, id, type }: ParticipantsProps) => {

    const users: IParticipant[] = participants?.length > 5 ? participants.slice(0, 4) : participants;

    const dispatch = useAppDispatch();

    const handleOpenModal = () => {
        if (id) {
            dispatch(commonSlice.actions.openParticipantsModal({ type, id }))
        }
    }

    if (participants) return (
        <div className={styles.participants}>
            <div className={styles.list}>
                {users.map((user, index) => (
                    <Participant
                        key={index}
                        firstName={user.user.firstName}
                        image={user.user.avatar}
                        zIndex={index}
                    />
                ))}
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