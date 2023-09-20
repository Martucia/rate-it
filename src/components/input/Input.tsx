import React, { CSSProperties, ChangeEvent, InputHTMLAttributes } from 'react';
import styles from './Input.module.sass';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    style?: CSSProperties
    placeholder?: string | undefined
    name?: string | undefined
    label?: string | undefined
    value: string
    setValue: (val: string) => void
    type?: string | undefined
    onEnterDown?: any
}

const Input = ({
    onEnterDown,
    style = {},
    placeholder = "", name,
    label = "",
    value = "",
    setValue,
    type = "text"
}: InputProps) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (onEnterDown && event.key === "Enter") {
            onEnterDown()
        }
    }

    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={handleInputChange}
            className={styles.input}
            style={style}
            onKeyDown={handleOnKeyDown}
        />
    );
}

export default Input;