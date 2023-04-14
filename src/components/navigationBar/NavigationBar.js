import React from "react";
import './NavigationBar.css';
import { NavLink } from "react-router-dom";
import sliders from '../../assets/slider-logo.jpg'
import Logo from "../logo/Logo";

export default function NavigationBar(){

    return(
        <nav className='navigation_bar'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : 'default-link'} >Home</NavLink>
            <NavLink to="/drop-your-demo" className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>Demo Drop</NavLink>
            <Logo />
            <NavLink to="/sign-in" className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>Login</NavLink>
            <NavLink to="/sign-up" className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>Register</NavLink>
        </nav>
    )
}