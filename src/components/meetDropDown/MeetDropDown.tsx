import React, { useEffect, useRef } from 'react';

import styles from './MeetDropDown.module.sass';

import chat from '@images/chat.svg'
import save from '@images/save.svg'
import copy from '@images/copy.svg'
import close from '@images/close.svg'

interface MeetDropDownProps {
    setOpen: Function,
    button: React.RefObject<HTMLButtonElement>;
}

const MeetDropDown = ({ setOpen, button }: MeetDropDownProps) => {
    const dropDown = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropDown.current
                && !dropDown.current.contains(event.target as Node)
                && !button.current?.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className={styles.dropdown} ref={dropDown}>
            <div className={styles.triangle}></div>
            <button className={styles.button}>
                <img src={chat} alt="" />
                Responses
            </button>
            <button className={styles.button}>
                <img src={save} alt="" />
                Save as template
            </button>
            <button className={styles.button}>
                <img src={copy} alt="" />
                Copy link
            </button>
            <button className={styles.button}>
                <img src={close} alt="" />
                Close survey
            </button>
        </div>
    );
}

export default MeetDropDown;