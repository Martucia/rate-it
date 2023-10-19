import { FC, MutableRefObject } from 'react'

import styles from './Kanban.module.sass';
import { useScroll } from '../../hooks/scroll';

interface ScrollBtnProps {
    currentRef: MutableRefObject<HTMLDivElement | null>
}

const ScrollBtn: FC<ScrollBtnProps> = ({ currentRef }) => {

    const {
        mouseEnter,
        mouseLeave,
        isScrolledToLeft,
        isScrolledToRight
    } = useScroll(currentRef);

    return (
        <>
            {!isScrolledToLeft && (
                <button
                    onMouseEnter={() => mouseEnter("left")}
                    onMouseLeave={mouseLeave}
                    className={`${styles.scroll} ${styles.left}`}
                >
                    {"<"}
                </button>
            )}

            {!isScrolledToRight && (
                <button
                    onMouseEnter={() => mouseEnter("right")}
                    onMouseLeave={mouseLeave}
                    className={`${styles.scroll} ${styles.right}`}
                >
                    {">"}
                </button>
            )}
        </>

    );
}

export default ScrollBtn;