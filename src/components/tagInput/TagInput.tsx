import { useState } from 'react';
import styles from './TagInput.module.sass';
import { IParticipant } from '../../types/user';
import { BASE_URL } from '../../utils/constants';
import x from '@images/x.svg'
import { useAppSelector } from '../../actions/redux';

interface TagInputProps {
    // users: IParticipant[],
    users: { email: string }[] // | IParticipant[]
    setUsers: Function,
    check: (email: string) => boolean
}

const TagInput = ({ users, setUsers, check }: TagInputProps) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const id = useAppSelector(state => state.userReducer.user?.id);

    const handleChangeValue = (e: any) => {
        setValue(e.target.value);
        setError("");
    }

    const handleRemoveUser = (email: string) => {
        setUsers((prev: { email: string }[]) => prev.filter(pr => pr.email !== email));
    }

    const handlePressEnter = async (e: any) => {
        if (e.key === "Enter" && value.length !== 0) {
            const trimValue = value.trim();

            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

            const isExist = check(trimValue);
            const isAdded = users.find(user => user.email === trimValue)

            if (isExist) {
                setError("This email already invited");
            } else if (isAdded) {
                setError("This email already added");
            } else if (!emailRegex.test(trimValue)) {
                setError("It's not an email");
            } else {
                setUsers((prev: IParticipant[]) => ([...prev, { email: trimValue }]));
                setValue("");
            }
        }
    }

    return (
        <>
            <div className={styles.container}>
                {users.map(user => (
                    <div className={styles.user} key={user.email}>
                        {/* {user.user?.avatar && (
                            <div className={styles.avatar}>
                                <img src={`${BASE_URL}/file/${user.user.avatar}`} alt="" />
                            </div>
                        )} */}
                        <span className={styles.text}>{user.email}</span>
                        {/* {id !== user.id && ( */}
                        <button onClick={() => handleRemoveUser(user.email)} className={styles.remove}>
                            <img src={x} alt="" />
                        </button>
                        {/* )} */}

                    </div>
                ))}

                <input
                    type="text"
                    className={styles.input}
                    placeholder='Enter email'
                    value={value}
                    onChange={handleChangeValue}
                    onKeyDown={handlePressEnter}
                />
            </div>
            <div className={styles.error}>
                {error}
            </div>
        </>

    );
}

export default TagInput;