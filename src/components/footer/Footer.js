import React from "react";
import styles from './Footer.module.css'
import stylesIndex from '../../index.module.css'
import Logo from "../logo/Logo";
import '../../index.module.css'

export default function Footer() {
    return (
        <section className={stylesIndex['outer-container']}>

        <section className={stylesIndex['inner-container']}>
        <footer className={styles.footer}>
            <Logo />
            <p className={styles.companyInfo}>
                Elevate Records inc. <br/>
                Coolsingel 47F <br/>
                3012 AA Rotterdam <br/>
                info@elevaterecords.nl <br/>
            </p>

        </footer>
        </section>
        </section>

    )

}