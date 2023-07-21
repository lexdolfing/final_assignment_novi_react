
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
        } else {
            navigate("/sign-in");
        }
    }, []);
    return null;
}