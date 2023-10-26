import { FC } from 'react'
import { NavLink } from 'react-router-dom';
import PopupHoc from '../../hoc/Popup';

import settings from '@images/settings2.svg';
import logout from '@images/logout.svg';

import { userSlice } from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../actions/redux';

interface PopupProps {
    close: () => void
}

const Popup: FC<PopupProps> = ({ close }) => {
    const dispatch = useAppDispatch();

    return (
        <PopupHoc close={close}>
            <NavLink to='/tasks/settings' onClick={close}>
                <img src={settings} alt="" />
                Settings
            </NavLink>
            <button onClick={() => dispatch(userSlice.actions.logOut())}>
                <img src={logout} alt="" />
                Log out
            </button>
        </PopupHoc>
    );
}

export default Popup;