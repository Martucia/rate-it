import { FC } from 'react';
import PopupHoc from '../../hoc/Popup';
import styles from './Header.module.sass';

interface NotificationsProps {
    close: () => void
}

const Notifications: FC<NotificationsProps> = ({ close }) => {
    return (
        <PopupHoc close={close}>
            <div className={styles.notifications}>
                
            </div>
        </PopupHoc>

    );
}

export default Notifications;