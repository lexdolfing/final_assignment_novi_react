import React from "react";
import styles from './Logo.module.css';
import sliders from "../../assets/slider-logo.jpg";

export default function Logo() {

    return (
        <article className={styles['logo-name-container']}>
            <img src={sliders} alt="logo of a headphone" className={styles["sliders-logo"]}/>
            <p className={styles["company-name"]}>Elevate Records</p>
        </article>

    )
}