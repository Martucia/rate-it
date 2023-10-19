import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '../../actions/redux';
import { IParticipant, IUser } from '../../types/user';
import { ClickOutside } from '../../utils/functions';

import styles from './ParticipantsInput.module.sass';

import avatar from '@images/lis.jpg';
import x from '@images/x.svg';


const ParticipantsInput = () => {
    const [picked, setPicked] = useState<IParticipant[]>([]);
    const [isOpen, setOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('');

    const dispatch = useAppDispatch();
    const list = useRef<HTMLDivElement | null>(null);

    useEffect(() => ClickOutside({ element: list, close: setOpen }), []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchVal(event.target.value);

        setOpen(true);
    };

    const handlePickUser = (user: IParticipant) => {
        setPicked((prev) => ([...prev, user]))
    }

    const handleUnPickUser = (lastName: string) => {
        setPicked((prev) => prev.filter(u => u.user.lastName !== lastName))
    }

    return (
        <div className={styles.dropdown}>
            <div className={styles.list}>
                {picked.map((user) => (
                    <div className={styles.picked_user} key={user.user.firstName}>
                        <img className={styles.image} src={user.user.avatar} alt="" />
                        <span>
                            {user.user.firstName}
                        </span>
                        <button onClick={() => handleUnPickUser(user.user.lastName)} className={styles.close}>
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
                    {/* {users.map(user => (
                        !picked.find(p => p.user.lastName !== user.lastName) && (
                            <button onClick={() => handlePickUser(user)} key={user.firstName} className={styles.user}>
                                <img className={styles.image} src={user.avatar} alt="" />
                                <div className={styles.name}>
                                    {user.firstName} {user.lastName}
                                </div>
                            </button>
                        )
                    ))} */}
                </div>
            )}

        </div>
    );
}

export default ParticipantsInput;