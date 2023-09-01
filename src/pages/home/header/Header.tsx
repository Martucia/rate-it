import { NavLink } from 'react-router-dom'; // useNavigate

import styles from './Header.module.sass';

import logo from '@images/logo.svg'

const Header = () => {
    // const navigate = useNavigate();

    // const handleScrollToComponent = (path: string) => {
    //     console.log(path)
    //     navigate(`#${path}`);
    // };

    return (
        <header className={styles.header}>
            <NavLink to='/'>
                <img src={logo} alt="logo" />
            </NavLink>

            <nav className={styles.nav}>
                {/* <button onClick={() => handleScrollToComponent("howItWorks")}>
                    How it works
                </button> */}
                <NavLink to="#howItWorks">
                    How it works
                </NavLink>
                <NavLink to="#pricing">
                    Pricing
                </NavLink>
                <NavLink to="#why-its-important">
                    Why it’s important
                </NavLink>
                <NavLink to="#about-us">
                    About us
                </NavLink>
                <NavLink to="#contact">
                    Contact
                </NavLink>
            </nav>

            <div className={styles.btns}>
                <button className={`${styles.btn} button`}>
                    Login
                </button>
                <button className={`${styles.btn} button-blue`}>
                    Sign up
                </button>
            </div>
        </header>
    );
}

export default Header;