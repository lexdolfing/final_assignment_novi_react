import React, {createContext, useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [redirectUrl, setRedirectUrl] = useState('/drop-your-demo');
    const [isAuthenticated, toggleIsAuthenticated] = useState({
        isAuthenticated: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    //Mounting effect
    useEffect(() => {
        const token = localStorage.getItem('token');

        // als er een token is, haal opnieuw gebruikersdata op
        if (token) {
            const tokenDecoded = jwt_decode(token);
             void fetchUserData(token, tokenDecoded);
        } else {
            toggleIsAuthenticated({
                isAuthenticated: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(token) {
        localStorage.setItem('token', token);
        const tokenDecoded = jwt_decode(token);
        fetchUserData(token, tokenDecoded)
        console.log("user is logged in")
        console.log(token)
    }

    function logout() {
        localStorage.clear();
        toggleIsAuthenticated({
            isAuthenticated: false,
            user: null,
            status: 'done'
        });
        console.log('gebruiker is uitgelogd!')
        navigate('/');
    }

    async function fetchUserData(token, tokenDecoded) {
        try {
            const result = await axios.get(`http://localhost:8081/users/${tokenDecoded.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            toggleIsAuthenticated({
                ...isAuthenticated,
                isAuthenticated: true,
                user: {
                    username: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
            });

            if(redirectUrl) {
                if (tokenDecoded.sub.includes('@elevaterecords.nl')) {
                    setRedirectUrl('/demo-overview')
                    console.log(redirectUrl);
                }
                navigate(redirectUrl);
            }

        } catch(e) {
            console.error(e + "error in fetching user data");
            toggleIsAuthenticated({
                isAuthenticated: false,
                user: null,
                status: 'done',
            });
        }
    }

    const data = {
        isAuthenticated: isAuthenticated.isAuthenticated,
        login: login,
        logout: logout,
        user: isAuthenticated.user,
    }

    return (
        <AuthContext.Provider value={data}>
            {isAuthenticated.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider