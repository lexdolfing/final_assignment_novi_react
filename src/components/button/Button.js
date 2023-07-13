import React from "react";
import styles from './Button.module.css';


export default function Button({button_content, onClick, bigOrSmall, buttonType}) {

    return (
        <button
            type={buttonType}
            onClick={onClick}
            className={`${styles[bigOrSmall]}`}
        >
            {button_content}
        </button>
    )
}