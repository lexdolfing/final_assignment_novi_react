import React from "react";
import './Logo.css';
import sliders from "../../assets/slider-logo.jpg";

export default function Logo() {

    return (
        <article className="logo-name-container">
            <img src={sliders} alt="logo of a headphone" className="sliders-logo"/>
            <p className="company-name">Elevate Records</p>
        </article>

    )
}