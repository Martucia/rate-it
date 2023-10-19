import { useAppDispatch } from '../../actions/redux';
import { commonSlice } from '../../store/reducers/commonSlice';
import styles from './Kanban.module.sass';

import empty from '@images/empty.png'

const Empty = () => {

    const dispatch = useAppDispatch();

    const handleOpenStageCreate = () => {
        dispatch(commonSlice.actions.toggleParam({
            param: "isStageCreateOpen",
            value: true
        }))
    }

    return (
        <div className={styles.empty}>
            <div className={styles.img}>
                <img src={empty} alt="" />
            </div>
            <div className={styles.text}>
                There are no stages yet
            </div>
            <div className={styles.subtext}>
                You need to create one to start managing your goals
            </div>
            <button onClick={handleOpenStageCreate} className={styles.btn}>
                Create one
            </button>
        </div>
    );
}

export default Empty;