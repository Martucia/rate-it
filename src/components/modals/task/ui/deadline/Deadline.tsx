import { FC, useState } from 'react'
import styles from '../../Task.Details.module.sass'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd/es/date-picker';

interface DeadlineProps {
    deadline: Date | null,
    setDeadline: (val: Date | null) => void,
    save: () => void
}

const Deadline: FC<DeadlineProps> = ({ deadline, setDeadline, save }) => {
    const [isDeadlineEditing, setDeadlineEdit] = useState<boolean>(false);

    const deadlineText = deadline ? dayjs(deadline).format('MMMM D, HH:mm') : "No deadline has been set";

    const onOk = (value: DatePickerProps['value']) => {
        console.log('onOk', value)
        if (value) {
            const date = value.toDate();
            setDeadline(date);
        }
    };

    const onChange = (
        value: DatePickerProps['value']
    ) => {
        const date = value?.toDate();
        setDeadline(date || null);
    };

    function handleSave() {
        save();
        setDeadlineEdit(false);
    }

    const style = dayjs(deadline) > dayjs() || !deadline ? { opacity: 0.7 } : { color: '#dd0000', opacity: 0.7, fontWeight: 700 };

    return (
        <div className={styles.block}>
            <div className={styles.block_header}>
                Deadline
                <button
                    className={styles.btn}
                    onClick={() =>
                        isDeadlineEditing
                            ? handleSave()
                            : setDeadlineEdit(true)}
                >
                    {isDeadlineEditing ? "save" : "edit"}
                </button>
            </div>
            {isDeadlineEditing
                ?
                <DatePicker
                    showTime
                    onOk={onOk}
                    defaultValue={deadline ? dayjs(deadline) : undefined}
                    onChange={onChange}
                />
                : <div style={style} onClick={() => setDeadlineEdit(true)}>{deadlineText}</div>
            }
        </div>
    );
}

export default Deadline;