import React from "react";
import './NavigationBar.css';
import {Link} from "react-router-dom";

export default function NavigationBar(){

    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/drop-your-demo">Demo Drop</Link>
            <Link to="/sign-in">Login</Link>
            <Link to="/sign-up">Register</Link>
        </nav>
    )
}