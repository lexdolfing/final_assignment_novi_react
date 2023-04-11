import React from "react";
import './button.css';


export default function Button({button_content, onClick}) {

    return(
        <button onClick={onClick}>{button_content}</button>
    )
}