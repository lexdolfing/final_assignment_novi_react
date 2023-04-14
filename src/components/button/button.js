import React from "react";
import './button.css';


export default function Button({button_content, onClick, bigOrSmall}) {

    return(
        <button onClick={onClick} className={bigOrSmall}>{button_content}</button>
    )
}