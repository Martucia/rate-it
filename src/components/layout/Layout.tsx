import { Outlet } from 'react-router-dom';
import styles from './Layout.module.sass';
import Header from '../header/Header';
import NavMenu from '../navMenu/NavMenu';
import { useState } from 'react';
import { useAppSelector } from '../../actions/redux';
import ZoomPage from '../zoomImage/ZoomPage';

const Layout = () => {
    const [isNavMenuOpen, setNavMenuOpen] = useState(true);
    const isZoomPageOpen = useAppSelector(state => state.commonReducer.zoomImage.isOpen);

    const handleToggleNavMenu = () => {
        setNavMenuOpen(!isNavMenuOpen);
    }

    return (
        <div className={`${styles.container} ${isNavMenuOpen ? styles.navmenu_open : styles.navmenu_close}`}>
            <NavMenu toggle={handleToggleNavMenu} isOpen={isNavMenuOpen} />

            <div className={styles.page}>
                <Header />
                <Outlet />
            </div>

            {isZoomPageOpen && <ZoomPage />}

        </div>
    );
}

export default Layout;