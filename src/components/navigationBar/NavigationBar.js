import React, {useState} from "react";
import styles from './NavigationBar.module.css';
import { NavLink } from "react-router-dom";
import Logo from "../logo/Logo";


export default function NavigationBar(){

  const [displayMenu, toggleDisplayMenu] = useState(false);

    return(
        <nav className={styles['navigation_bar']}>
            <NavLink to="/" className={({ isActive }) => isActive ? styles['active-link'] : styles['default-link']}>Home</NavLink>
            <NavLink to="/drop-your-demo" className={({ isActive }) => isActive ? styles['active-link'] : styles['default-link']}>Demo Drop</NavLink>
            <Logo />
            <NavLink to="/sign-in" className={({ isActive }) => isActive ? styles['active-link'] : styles['default-link']}>Login</NavLink>
            <NavLink to="/sign-up" className={({ isActive }) => isActive ? styles['active-link'] : styles['default-link']}>Register</NavLink>
            <button className={styles['menu-toggle']} onClick={ () => toggleDisplayMenu(!displayMenu)}>
                <span className={styles.hamburger}></span>
                {displayMenu &&
                    <div className={styles['mobile-menu']}>
                    <NavLink to="/" className={({ isActive }) => isActive ? styles['active-mobile-link'] : styles['default-mobile-link']}>Home</NavLink>
                    <NavLink to="/drop-your-demo" className={({ isActive }) => isActive ? styles['active-mobile-link'] : styles['default-mobile-link']}>Demo Drop</NavLink>
                    <NavLink to="/sign-in" className={({ isActive }) => isActive ? styles['active-mobile-link'] : styles['default-mobile-link']}>Login</NavLink>
                    <NavLink to="/sign-up" className={({ isActive }) => isActive ? styles['active-mobile-link'] : styles['default-mobile-link']}>Register</NavLink>
                    </div>
                }
            </button>
        </nav>
    )
}