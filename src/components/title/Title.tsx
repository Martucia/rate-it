import { useState, useRef, useEffect } from 'react';
import styles from './Title.module.sass';

import edit from '@images/ed.svg';
import { ClickOutside } from '../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../actions/redux';
import { updateProject } from '../../actions/projects';

interface TitleProps {
    // title: string;
    isEdited: boolean,
    projectId: number | null
}

const Title = ({ projectId, isEdited }: TitleProps) => { //  title, 
    const [isEdit, setEdit] = useState(false);
    const [value, setValue] = useState('');

    const title = useAppSelector(state => state.projectReducer.projects.find(project => project.id === projectId)?.name)

    const inputRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (title) setValue(title);
    }, [title])

    const save = () => {

        if (value.length > 0 && projectId) {
            dispatch(updateProject({ name: value, id: projectId }));
        } else {
            if (title) {
                setValue(title);
            }
        }
    }

    const handleOnChangle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleToggleEdit = () => {
        if (projectId) {
            setEdit(!isEdit);

            if (title !== value && isEdit) {
                save();
            }
        }
    }

    useEffect(() => {
        if (isEdit && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEdit])


    const closeEdit = (val: boolean) => {
        save();

        setEdit(val);
    }

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key === "Enter") {
            if (title !== value) {
                save();
            }

            setEdit(false);
        }
    }

    useEffect(() => ClickOutside({ element: titleRef, close: closeEdit }), []);

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
                    onChange={handleOnChangle}
                    onKeyDown={handleEnterPress}
                />
                : <span onDoubleClick={handleToggleEdit}>
                    {value}
                </span>
            }

            {isEdited && projectId
                && <button onClick={handleToggleEdit}>
                    <img src={edit} alt="edit" />
                </button>}
        </h3>
    );
}

export default Title;