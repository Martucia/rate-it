import { useState } from 'react';
import styles from './TagInput.module.sass';
import { IParticipant } from '../../types/user';
import { BASE_URL } from '../../utils/constants';
import x from '@images/x.svg'
import { useAppSelector } from '../../actions/redux';

interface TagInputProps {
    users: IParticipant[],
    setUsers: Function
}

const TagInput = ({ users, setUsers }: TagInputProps) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const id = useAppSelector(state => state.userReducer.user?.id);

    const handleChangeValue = (e: any) => {
        setValue(e.target.value);
        setError("")
    }

    const handleRemoveUser = (email: string) => {
        setUsers((prev: IParticipant[]) => prev.filter(pr => pr.user.email !== email));
    }

    const handlePressEnter = async (e: any) => {
        if (e.key === "Enter" && value.length !== 0) {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const isExist = users.find(user => user.user.email === value.trim())

            if (isExist) {
                setError("This email already invited");
            } else if (!emailRegex.test(value)) {
                setError("It's not an email");
            } else {
                setUsers((prev: string[]) => ([...prev, { email: value.trim(), status: "added" }]));
                setValue("");
            }
        }
    }

    return (
        <>
            <div className={styles.container}>
                {users.map(user => (
                    <div className={`${styles.user} ${styles[user.status]}`} key={user.user.id}>
                        {user.user.avatar && (
                            <div className={styles.avatar}>
                                <img src={`${BASE_URL}/file/${user.user.avatar}`} alt="" />
                            </div>
                        )}
                        <span className={styles.text}>{user.user.email}</span>
                        {id !== user.id && (
                            <button onClick={() => handleRemoveUser(user.user.email)} className={styles.remove}>
                                <img src={x} alt="" />
                            </button>
                        )}

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