import React, {useContext, useEffect, useState} from "react";
import styles from './NavigationBar.module.css';
import {NavLink} from "react-router-dom";
import Logo from "../logo/Logo";
import {AuthContext} from "../../contexts/AuthContext";
import jwt_decode from "jwt-decode";
import {logDOM} from "@testing-library/react";


export default function NavigationBar() {

    const [displayMenu, toggleDisplayMenu] = useState(false);
    const {isAuthenticated, user} = useContext(AuthContext);


    return (
        <nav className={styles['navigation_bar']}>
            <NavLink to="/"
                     className={({isActive}) => isActive ? styles['active-link'] : styles['default-link']}>Home</NavLink>
            {/*render the rest of the NavBar on basis of authentication*/}
            {user && user.username.includes("elevaterecords.nl") ?
                ( <NavLink to="/demo-overview"
                         className={({isActive}) => isActive ? styles['active-link'] : styles['default-link']}>Demo Overview</NavLink>)
                :
                (<NavLink to="/drop-your-demo"
                         className={({isActive}) => isActive ? styles['active-link'] : styles['default-link']}>Demo Drop</NavLink>)
            }
            <Logo
            smallOrBig="big"
            />
            {isAuthenticated ?
                <>
                    <NavLink to='/sign-out'
                             className={({isActive}) => isActive ? styles['active-link'] : styles['default-link']}>Log
                        Out</NavLink>
                    <NavLink to='/user-info'
                             className={({isActive}) => isActive ? styles['active-link'] : styles['default-link']}>My
                        Account</NavLink>
                </>
                :
                <>
                    <NavLink to="/sign-in"
                             className={({isActive}) => isActive ? styles['active-link'] : styles['default-link']}>Login</NavLink>
                    <NavLink to="/sign-up"
                             className={({isActive}) => isActive ? styles['active-link'] : styles['default-link']}>Register</NavLink>
                </>
            }
            <button type="button" className={styles['menu-toggle']} onClick={() => toggleDisplayMenu(!displayMenu)}>
                <span className={styles.hamburger}></span>
                {displayMenu &&
                    <div className={styles['mobile-menu']}>
                        <NavLink to="/"
                                 className={({isActive}) => isActive ? styles['active-mobile-link'] : styles['default-mobile-link']}>Home</NavLink>
                        {user && user.username.includes("elevaterecords.nl") ?
                            <NavLink to="/demo-overview"
                                     className={({isActive}) => isActive ? styles['active-mobile-link'] : styles['default-mobile-link']}>Demo Overview</NavLink>
                            :
                        <NavLink to="/drop-your-demo"
                                 className={({isActive}) => isActive ? styles['active-mobile-link'] : styles['default-mobile-link']}>Demo
                            Drop</NavLink>
                        }
                        {isAuthenticated ?
                            <><NavLink to='/sign-out'
                                      className={({isActive}) => isActive ? styles['active-mobile-link'] : styles['default-mobile-link']}>Log
                                Out</NavLink>
                                <NavLink to='/user-info'
                                     className={({isActive}) => isActive ? styles['active-mobile-link'] : styles['default-mobile-link']}>My
                                Account</NavLink>
                            </>

                            :
                            <>
                        <NavLink to="/sign-in"
                                 className={({isActive}) => isActive ? styles['active-mobile-link'] : styles['default-mobile-link']}>Login</NavLink>
                        <NavLink to="/sign-up"
                                 className={({isActive}) => isActive ? styles['active-mobile-link'] : styles['default-mobile-link']}>Register</NavLink>
                            </>
                        }
                    </div>
                }
            </button>
        </nav>
    )
}