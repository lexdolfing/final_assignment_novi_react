
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";


export default function SignOut() {
    const { logout } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            logout(token);
            console.log('The SignOut function has been called');
        } else {
            console.log("else");
            navigate("/sign-in");
        }
    }, []);
    return null;
}