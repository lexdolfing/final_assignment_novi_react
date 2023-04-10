import React from "react";
import './NavigationBar.css';
import { NavLink } from "react-router-dom";
import sliders from '../../assets/5094333.jpg'

export default function NavigationBar(){

    return(
        <nav className='navigation_bar'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : 'default-link'} >Home</NavLink>
            <NavLink to="/drop-your-demo" className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>Demo Drop</NavLink>
            <img src={sliders} alt="logo of a headphone" className="sliders_logo"/>
            <NavLink to="/sign-in" className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>Login</NavLink>
            <NavLink to="/sign-up" className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>Register</NavLink>
        </nav>
    )
}