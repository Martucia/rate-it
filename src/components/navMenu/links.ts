import anl from '@images/nav_anl.svg';
import settings from '@images/nav_settings.svg'
import inboxImg from '@images/inbox.svg';

export const sections = [
    {
        name: "Dashboards",
        links: [
            {
                name: "My tasks",
                image: inboxImg,
                link: "/tasks/",
                count: 4
            },
            {
                name: "Drive Files",
                image: inboxImg,
                link: "/tasks/files",
                count: 6
            },
            {
                name: "Analytics",
                image: anl,
                link: "/tasks/analytics/"
            },
            {
                name: "Settings",
                image: settings,
                link: "/tasks/settings",

            },
        ]
    }
]