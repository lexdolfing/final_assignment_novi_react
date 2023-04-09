import React from "react";
import './NavigationBar.css';
import {Link} from "react-router-dom";

export default function NavigationBar(){

    return(
        <nav className='navigation_bar'>
            <Link to="/" className='link'>Home</Link>
            <Link to="/drop-your-demo" className='link'>Demo Drop</Link>
            <Link to="/sign-in" className='link'>Login</Link>
            <Link to="/sign-up" className='link'>Register</Link>
        </nav>
    )
}