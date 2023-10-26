import { useState } from 'react';

import styles from './Meetings.module.sass';

import Title from '../../components/navigation/Navigation.Title';
import MeetBlock from '../../components/meetBlock/MeetBlock';
import Empty from '../systemPages/Empty';

const pages = [
    'Upcoming',
    'Past',
    'Archived'
];

const meetings = [
    {
        name: "Sales Kickoff Meeting",
        mark: true,
        date: "07-09-2023",
        participants: [
            'zixwelly.maks@gmail.com',
            'zuhes@gmail.com'
        ],
        rate: null
    },
    {
        name: "Sales Kickoff Meeting",
        mark: true,
        date: "07-09-2023",
        participants: [
            'zixwelly.maks@gmail.com',
            'zuhes@gmail.com'
        ],
        rate: 3
    },
    {
        name: "Sales Kickoff Meeting",
        mark: true,
        date: "07-09-2023",
        participants: [
            'zixwelly.maks@gmail.com',
            'zuhes@gmail.com'
        ],
        rate: 6
    },
    {
        name: "Sales Kickoff Meeting",
        mark: true,
        date: "07-09-2023",
        participants: [
            'zixwelly.maks@gmail.com',
            'zuhes@gmail.com'
        ],
        rate: 9
    }
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