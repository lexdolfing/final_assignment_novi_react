import React from "react";
import './Footer.css'
import Logo from "../logo/Logo";
import '../../index.css'

export default function Footer() {
    return (
        <section className="outer-container">


        <footer className="inner-container">
            <Logo />
            <p className="company-info">
                Elevate Records inc. <br/>
                Coolsingel 47F <br/>
                3012 AA Rotterdam <br/>
                info@elevaterecords.nl <br/>
            </p>

        </footer>
        </section>

    )

}