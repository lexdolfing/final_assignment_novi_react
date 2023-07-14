import React from "react";
import styles from './Logo.module.css';
import sliders from "../../assets/slider-logo.jpg";

export default function Logo({smallOrBig}) {
const logoClassName = `${styles["sliders-logo"]} ${styles[smallOrBig]}`;

    return (
        <article className={styles['logo-name-container']}>
            <img src={sliders} alt="logo of a headphone" className={logoClassName}/>
            {smallOrBig === "big" &&
                <p className={styles["company-name"]}>Elevate Records</p>
            }

        </article>

    )
}