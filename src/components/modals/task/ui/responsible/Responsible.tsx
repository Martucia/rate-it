// import styles from './Responsible.module.sass';
import { FC, useState, useMemo } from 'react'

import styles from '../../Task.Details.module.sass'
import { IParticipant, IUser } from '../../../../../types/user';
import plus from '@images/pl.svg';
import { NavLink, useOutletContext } from 'react-router-dom';
import { SelectProps } from 'antd';
import { Select } from 'antd';
import { BASE_URL } from '../../../../../utils/constants';
import { ITask } from '../../../../../types/task';

interface ResponsibleProps {
    // set: (val: IUser | IUser[]) => void,
    set: any,
    save: () => void,
    participants: IParticipant[],
    task: ITask
}

const Responsible: FC<ResponsibleProps> = ({
    set,
    save,
    participants,
    task
}) => {
    const [isResponsibleEditing, setResponsibleEdit] = useState<boolean>(false);

    const responsible = useMemo(() => task.responsible.map(user => String(user.id)), [task.responsible]);

    const options: SelectProps['options'] = useMemo(() => participants.map(user => {
        return {
            value: String(user.user.id),
            label: `${user.user.firstName} ${user.user.lastName}`
        }
    }), []);

    const handleChange = (value: string | string[]) => {

        if (typeof value === 'string') {
            const userOut = participants.find(user => user.user.id === +value)?.user;;
            if (userOut) {
                set((prev: any) => [...prev, userOut])
            }

        } else if (Array.isArray(value)) {
            let usersOut: IUser[] = [];
            value.forEach(val => {
                const user = participants.find(user => user.user.id === +val)?.user;
                if (user) {
                    usersOut.push(user);
                }
            });
            set([...usersOut]);
        }
    };

    function handleSave () {
        save();
        setResponsibleEdit(false);
    }

    return (
        <div className={styles.block}>
            <div className={styles.block_header}>
                Executants
                <button
                    className={styles.btn}
                    onClick={() =>
                        isResponsibleEditing
                            ? handleSave()
                            : setResponsibleEdit(!isResponsibleEditing)}
                >
                    {isResponsibleEditing ? "save" : "edit"}
                </button>
            </div>
            {isResponsibleEditing
                ?
                <Select
                    mode="multiple"
                    size="middle"
                    placeholder="Select executant"
                    defaultValue={responsible}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                    options={options}
                />
                :
                task.responsible.length > 0
                    ? task.responsible.map(user =>
                        <NavLink key={user.id} to="/" className={styles.user}>
                            <div className={styles.avatar}>
                                <img src={`${BASE_URL}/file/${user.avatar}`} alt={user.avatar} />
                            </div>
                            <span>{user.firstName} {user.lastName}</span>
                        </NavLink>
                    )
                    : <button
                        className={styles.plus}
                        onClick={() => setResponsibleEdit(!isResponsibleEditing)}
                    >
                        <img src={plus} alt="plus" />
                    </button>
            }


        </div>
    );
}

export default Responsible;