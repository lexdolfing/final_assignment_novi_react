import React from "react";
import styles from './NavigationBar.module.css';
import { NavLink } from "react-router-dom";
import sliders from '../../assets/slider-logo.jpg'
import Logo from "../logo/Logo";

export default function NavigationBar(){

    return(
        <nav className={styles['navigation_bar']}>
            <NavLink to="/" className={({ isActive }) => isActive ? styles['active-link'] : styles['default-link']}>Home</NavLink>
            <NavLink to="/drop-your-demo" className={({ isActive }) => isActive ? styles['active-link'] : styles['default-link']}>Demo Drop</NavLink>
            <Logo />
            <NavLink to="/sign-in" className={({ isActive }) => isActive ? styles['active-link'] : styles['default-link']}>Login</NavLink>
            <NavLink to="/sign-up" className={({ isActive }) => isActive ? styles['active-link'] : styles['default-link']}>Register</NavLink>
        </nav>
    )
}