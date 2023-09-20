import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '../../actions/redux';
import { IUser } from '../../types/user';
import { ClickOutside } from '../../utils/functions';

import styles from './ParticipantsInput.module.sass';

import avatar from '@images/lis.jpg';
import x from '@images/x.svg';

const users = [
    {
        firstName: "Максим",
        lastName: "Слізняк",
        avatar: avatar,
        email: "gamermax85@gmail.com"
    },
    {
        firstName: "Ростік",
        lastName: "Лісняк",
        avatar: avatar,
        email: "gamermax85@gmail.com"
    },
    {
        firstName: "Сергій",
        lastName: "Ліс",
        avatar: avatar,
        email: "gamermax85@gmail.com"
    },
]

const ParticipantsInput = () => {
    const [picked, setPicked] = useState<IUser[]>([]);
    const [isOpen, setOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('');

    const dispatch = useAppDispatch();
    const list = useRef<HTMLDivElement | null>(null);

    useEffect(() => ClickOutside({ element: list, close: setOpen }), []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchVal(event.target.value);

        setOpen(true);
    };

    const handlePickUser = (user: IUser) => {
        setPicked((prev: IUser[]) => ([...prev, user]))
    }

    const handleUnPickUser = (lastName: string) => {
        setPicked((prev: IUser[]) => prev.filter(u => u.lastName !== lastName))
    }

    return (
        <div className={styles.dropdown}>
            <div className={styles.list}>
                {picked.map((user: IUser) => (
                    <div className={styles.picked_user} key={user.firstName}>
                        <img className={styles.image} src={user.avatar} alt="" />
                        <span>
                            {user.firstName}
                        </span>
                        <button onClick={() => handleUnPickUser(user.lastName)} className={styles.close}>
                            <img src={x} alt="" />
                        </button>
                    </div>
                ))}
            </div>

            <input
                type="text"
                className={styles.input}
                value={searchVal}
                onChange={handleInputChange}
                placeholder='User name'
            />

            {isOpen && (
                <div ref={list} className={styles.content}>
                    {users.map(user => (
                        !picked.find(p => p.firstName === user.firstName) && (
                            <button onClick={() => handlePickUser(user)} key={user.firstName} className={styles.user}>
                                <img className={styles.image} src={user.avatar} alt="" />
                                <div className={styles.name}>
                                    {user.firstName} {user.lastName}
                                </div>
                            </button>
                        )
                    ))}
                </div>
            )}

        </div>
    );
}

export default ParticipantsInput;