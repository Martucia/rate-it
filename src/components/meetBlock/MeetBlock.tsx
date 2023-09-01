import { useState } from 'react';

import { formatDate } from '../../utils/functions.tsx';

import styles from './MeetBlock.module.sass';

import settings from '@images/settings3.svg';
import participantsImg from '@images/participants.svg';
import Toggle from '../toggle/Toggle.tsx';

interface MeetBlockProps {
    name: string,
    mark: boolean,
    date: string,
    participants: any[],
    rate?: number
}

const MeetBlock = ({ name, mark = false, date, participants, rate }: MeetBlockProps) => {
    const [isMarked, setMarked] = useState(mark);

    const handleSetMarked = () => {
        setMarked(!isMarked);
    }

    const meetTime = () => formatDate(date);

    return (
        <div className={styles.meet}>
            <div onClick={handleSetMarked} className={`${styles.mark} ${isMarked && styles.marked}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="27" viewBox="0 0 29 27" fill="none">
                    <path d="M15.8259 1.92829C15.4241 0.690569 13.673 0.690569 13.2699 1.92829L11.2285 8.20963C11.1406 8.47928 10.9696 8.71421 10.74 8.88077C10.5105 9.04733 10.2341 9.13699 9.95046 9.13692H3.34659C2.04571 9.13692 1.50277 10.8033 2.55638 11.5694L7.89969 15.4505C8.12921 15.6174 8.30003 15.8526 8.38767 16.1225C8.4753 16.3924 8.47525 16.6831 8.38752 16.953L6.3475 23.2343C5.94433 24.472 7.36213 25.5028 8.4144 24.7368L13.7577 20.8556C13.9874 20.6887 14.264 20.5988 14.5479 20.5988C14.8318 20.5988 15.1085 20.6887 15.3381 20.8556L20.6814 24.7368C21.7337 25.5028 23.1515 24.4734 22.7483 23.2343L20.7083 16.953C20.6206 16.6831 20.6205 16.3924 20.7082 16.1225C20.7958 15.8526 20.9666 15.6174 21.1961 15.4505L26.5394 11.5694C27.5917 10.8033 27.0515 9.13692 25.7492 9.13692H19.144C18.8606 9.13671 18.5845 9.04691 18.3552 8.88037C18.1259 8.71383 17.9552 8.47907 17.8673 8.20963L15.8259 1.92829Z" stroke="#AAB2C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div className={styles.name}>
                {name}
            </div>

            <div className={styles.date}>
                {meetTime()}
            </div>

            <div className={styles.btns}>
                <button className={styles.button}>
                    <img src={participantsImg} alt="" />
                    <span>{participants.length} Participants</span>
                </button>
                <button className={styles.button}>
                    <img src={settings} alt="" />
                    <span>Edit</span>
                </button>
                <div className={styles.rate}>
                    <div className={styles.rate_number}>{rate ? `${rate}/10` : <span className={styles.border}></span>}</div>
                    <span>Average rating</span>
                </div>
                <div className={styles.actived}>
                    <Toggle />
                </div>
            </div>

        </div>
    );
}

export default MeetBlock;
