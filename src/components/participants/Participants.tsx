import styles from './Participants.module.sass';
import plus from '@images/pl.svg';
import { IParticipant, IUser } from '../../types/user';
import { useAppDispatch } from '../../actions/redux';
import { commonSlice } from '../../store/reducers/commonSlice';
import { BASE_URL } from '../../utils/constants';

interface ParticipantProps {
    image: string | null,
    firstName: string,
    zIndex: number,
    wh: number
}

const Participant = ({ image, firstName, zIndex, wh }: ParticipantProps) => {
    return (
        <div style={{ zIndex, width: `calc(${wh}px - 18%)`, height: wh }} className={styles.participant}>
            <div className={styles.participant_inner} style={{ width: wh }}>
                <img src={`${BASE_URL}/file/${image}`} alt={firstName} />
            </div>
        </div>
    );
}

type User = IParticipant[] | IUser[];

interface ParticipantsProps {
    max: number,
    participants: User,
    type: 'task' | 'project',
    id: number | null,
    size: 'small' | 'large'
}

const Participants = ({ max, participants, id, type, size }: ParticipantsProps) => {

    const users: User = participants?.length > 5 ? participants.slice(0, 4) : participants;

    const dispatch = useAppDispatch();

    const handleOpenModal = () => {
        if (id) {
            dispatch(commonSlice.actions.openParticipantsModal({ type, id }))
        }
    }

    function isParticipant(user: IUser | IParticipant): user is IParticipant {
        return (user as IParticipant).user !== undefined;
    }

    const wh = size === 'large' ? 40 : 32;

    if (participants) return (
        <div className={styles.participants}>
            <div className={styles.list}>
                {users.map((user, index) => (
                    <Participant
                        key={index}
                        firstName={isParticipant(user) ? user.user.firstName : user.firstName}
                        image={isParticipant(user) ? user.user.avatar : user.avatar}
                        zIndex={index}
                        wh={wh}
                    />
                ))}
                {participants.length > max
                    && <div className={styles.more} style={{ width: wh, height: wh }}>
                        +{max}
                    </div>
                }
            </div>

            {type === 'project' &&
                <button onClick={handleOpenModal} className={styles.plus} style={{ width: wh, height: wh }}>
                    <img src={plus} alt="plus" />
                </button>
            }
        </div>
    );
}

export default Participants;