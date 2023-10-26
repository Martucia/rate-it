import { useEffect, useRef, FC, ReactElement } from "react";
import { ClickOutside } from "../utils/functions";

import styles from './Popup.module.sass';

interface PopupProps {
    children: ReactElement | ReactElement[],
    close: () => void,
    style?: React.CSSProperties
}

const PopupHoc: FC<PopupProps> = ({ children, close, style }) => {

    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => ClickOutside({ element: popupRef, close }))

    return (
        <div ref={popupRef} className={styles.popup} style={style}>
            {children}
        </div>
    );
}

export default PopupHoc;