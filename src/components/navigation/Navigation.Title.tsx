import { useState, useRef, useEffect } from 'react';
import styles from './Navigation.Title.module.sass';

import edit from '@images/ed.svg';
import { ClickOutside } from '../../utils/functions';
import { useAppDispatch } from '../../actions/redux';
import { updateProject } from '../../actions/projects';

interface TitleProps {
    title: string,
    isEdited: boolean,
    projectId: number
}

const Title = ({ projectId, isEdited, title }: TitleProps) => {
    const [isEdit, setEdit] = useState(false);
    const [value, setValue] = useState(title);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    const save = () => {
        if (value.length > 0 && value !== title) {
            dispatch(updateProject({ name: value, id: projectId }));
        } else {
            setValue(title);
        }
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    useEffect(() => {
        if (isEdit && inputRef.current) {
            inputRef.current.focus();
        } else {
            save();
        }
    }, [isEdit])


    const toggleEdit = (val: boolean) => {
        setEdit(val);
    }

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setEdit(false);
        }
    }

    useEffect(() => ClickOutside({ element: titleRef, close: toggleEdit }), []);

    if (!projectId) {
        return (
            <h3 className={styles.title}>
                Your tasks
            </h3>
        )
    }

    return (
        <h3 ref={titleRef} className={styles.title}>
            {isEdit
                ? <input
                    ref={inputRef}
                    value={value}
                    className={styles.input}
                    onChange={handleOnChange}
                    onKeyDown={handleEnterPress}
                />
                : <span onDoubleClick={() => setEdit(true)}>
                    {value}
                </span>
            }

            {isEdited
                && <button onClick={() => setEdit(true)}>
                    <img src={edit} alt="edit" />
                </button>}
        </h3>
    );
}

export default Title;