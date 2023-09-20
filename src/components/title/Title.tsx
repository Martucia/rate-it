import { useState, useRef, useEffect } from 'react';
import styles from './Title.module.sass';

import edit from '@images/ed.svg';
import { ClickOutside } from '../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../actions/redux';
import { updateProject } from '../../actions/projects';

interface TitleProps {
    // title: string;
    isEdited: boolean,
    id: number
}

const Title = ({ id, isEdited }: TitleProps) => { //  title, 
    const [isEdit, setEdit] = useState(false);
    const [value, setValue] = useState('');

    const title = useAppSelector(state => state.projectReducer.projects.find(project => project.id === id)?.name)

    const inputRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (title) setValue(title);
    }, [title])

    const save = (val: string | number) => {
        console.log("save " + val)
        if (value.length > 0) {
            dispatch(updateProject({ name: value, id }));
        }
    }

    const handleOnChangle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleToggleEdit = () => {

        if (inputRef.current) {
            inputRef.current.focus();
        }

        setEdit(!isEdit);

        if (title !== value) {
            save(value);
        }
    }

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key === "Enter") {
            console.log(title, value)

            if (title !== value) {
                save(value);
            }

            setEdit(false);
        }
    }

    useEffect(() => ClickOutside({ element: titleRef, close: setEdit }), []);

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
                : <>
                    {value}
                </>}

            {isEdited
                && <button onClick={handleToggleEdit}>
                    <img src={edit} alt="edit" />
                </button>}
        </h3>
    );
}

export default Title;