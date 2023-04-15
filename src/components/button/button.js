import React from "react";
import './button.css';


export default function Button({button_content, onClick, bigOrSmall, buttonType}) {

    return(
        <button type={buttonType} onClick={onClick} className={bigOrSmall}>{button_content}</button>
    )
}