import { useState } from 'react';

import styles from './Meetings.module.sass';

import Title from '../../components/title/Title';
import MeetBlock from '../../components/meetBlock/MeetBlock';

const pages = [
    'Upcoming',
    'Past',
    'Archived'
];

const meetings = [
    {
        name: "Sales Kickoff Meeting",
        date: "2023-09-17T11:26:01.769+00:00",
        mark: false,
        participants: [
            {
                name: "John"
            },
            {
                name: "Marta"
            },
            {
                name: "Vitya"
            },
            {
                name: "Roma"
            }
        ]

    },
    {
        name: "Marketing Biweekly",
        date: "2023-09-04T11:26:01.769+00:00",
        mark: true,
        participants: [
            {
                name: "John"
            },
            {
                name: "Marta"
            },
            {
                name: "Roma"
            }
        ]

    },
    {
        name: "Team Call",
        date: "2023-09-02T11:26:01.769+00:00",
        mark: true,
        participants: [
            {
                name: "John"
            },
            {
                name: "Marta"
            }
        ]

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
                {meetings.map(meet => (
                    <MeetBlock key={meet.name} {...meet} />
                ))}
            </div>
        </div>
    );
}

export default Meetings;