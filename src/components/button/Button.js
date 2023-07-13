import React from "react";
import styles from './Button.module.css';


export default function Button({button_content, onClick, bigOrSmall, type}) {

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles[bigOrSmall]}`}
        >
            {button_content}
        </button>
    )
}