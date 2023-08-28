import { NavLink } from 'react-router-dom';

import styles from './Header.module.sass';

import logo from '@images/logo.svg'

const Header = () => {
    return (
        <header className={styles.header}>
            <NavLink to='/'>
                <img src={logo} alt="logo" />
            </NavLink>

            <nav className={styles.nav}>
                <NavLink to="#how-it-works">
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