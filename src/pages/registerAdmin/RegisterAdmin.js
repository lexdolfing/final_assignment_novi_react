import styles from './RegisterAdmin.module.css';
import React from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import stylesIndex from "../../index.module.css";

export default function RegisterAdmin() {
    return (
        <body className={stylesIndex['page-body']}>
            <NavigationBar/>
            <h1>Register as an Admin here</h1>
        </body>
    )
}