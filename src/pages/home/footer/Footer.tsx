import { NavLink } from 'react-router-dom';

import styles from './Footer.module.sass';

import twitter from '@images/twitter.svg';
import linkedin from '@images/ld.svg';
import logo from '@images/logo_white.svg';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <h2 className="sec-title" style={{ textAlign: "left", color: "#fff" }}>
                    Need help with anything?
                </h2>

                <div className={styles.links}>
                    <NavLink to='/'>
                        <img src={twitter} alt="twitter" />
                    </NavLink>
                    <NavLink to='/'>
                        <img src={linkedin} alt="linkedin" />
                    </NavLink>
                </div>
            </div>
            <div className={styles.wrapper}>
                <ul>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>What is it</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>How its works</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Why it’s important</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Pricing</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to='/'>Company</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>About</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Blog</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Careers</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to='/'>Legal</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Terms & Conditions</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Privacy & Policy</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Contact</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to='/'>Help</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>FAQs</NavLink>
                    </li>
                </ul>
            </div>
            <NavLink className={styles.logo} to='/'>
                <img src={logo} alt="Rate it" />
            </NavLink>
        </footer>
    );
}

export default Footer;