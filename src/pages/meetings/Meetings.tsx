import { useState } from 'react';

import styles from './Meetings.module.sass';

import Title from '../../components/title/Title';
import MeetBlock from '../../components/meetBlock/MeetBlock';
import Empty from '../systemPages/Empty';

const pages = [
    'Upcoming',
    'Past',
    'Archived'
];

const meetings = [
    
]

const Meetings = () => {
    const [activePage, setPage] = useState(pages[0]);

    return (
        <div className={styles.meetings}>
            <Title title="Meetings" />

            <nav className={styles.nav}>
                {pages.map(page => (
                    <button key={page} onClick={() => setPage(page)} className={`${styles.button} ${page == activePage && styles.active_page}`}>
                        {page}
                        <div className={styles.button_line}></div>
                    </button>
                ))}
            </nav>

            <div className={styles.list}>
                {meetings.length > 0
                    ? meetings.map(meet => (
                        <MeetBlock key={meet.name} {...meet} />
                    ))
                    : <Empty fixed={false} />
                }
            </div>
        </div>
    );
}

export default Meetings;