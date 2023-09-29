import { Outlet } from 'react-router-dom';
import styles from './Layout.module.sass';
import Header from '../header/Header';
import NavMenu from '../navMenu/NavMenu';
import { useState } from 'react';
import { useAppSelector } from '../../actions/redux';

// interface LayoutProps {
//     children: ReactNode;
// }

const Layout = () => {
    const [isNavMenuOpen, setNavMenuOpen] = useState(true);
    const { isAuth, isLoading } = useAppSelector(state => state.userReducer);

    const handleToggleNavMenu = () => {
        setNavMenuOpen(!isNavMenuOpen);
    }




    return (
        <div className={`${styles.container} ${isAuth ? isNavMenuOpen ? styles.navmenu_open : styles.navmenu_close : styles.navmenu_hidden}`}>
            {isAuth &&
                <NavMenu toggle={handleToggleNavMenu} isOpen={isNavMenuOpen} />
            }

            <div className={styles.page}>
                {isAuth &&
                    <Header />
                }

                <Outlet />
            </div>

        </div>
    );
}

export default Layout;