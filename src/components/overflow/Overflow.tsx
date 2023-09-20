import { ReactNode, useState } from 'react';
import styles from './Overflow.module.sass';

interface OverflowProps {
    children: ReactNode;
    isCenter: boolean;
    close?: () => void;
}

const Overflow = ({ children, isCenter, close }: OverflowProps) => {
    const [isMouseReleasedOnOverflow, setIsMouseReleasedOnOverflow] = useState(false);

    const handleMouseDown = (e: any) => {
        if (e.target === e.currentTarget && e.button === 0) {
            setIsMouseReleasedOnOverflow(true);
        }
    };

    const handleClose = (e: any) => {
        if (e.target === e.currentTarget && e.target.id === "overflow" && isMouseReleasedOnOverflow && close) {
            close();
        } else {
            setIsMouseReleasedOnOverflow(false);
        }
    }

    return (
        <div
            id="overflow"
            className={`${styles.overflow} ${isCenter && styles.center}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleClose}
        >
            {children}
        </div>
    );
}

export default Overflow;
