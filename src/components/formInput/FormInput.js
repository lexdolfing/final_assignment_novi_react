import React from 'react';
import styles from './FormInput.module.css'


export default function FormInput({register, errors, htmlFor, type, id, registerCallback, labelText, validationRules, className, accept}) {

    return (
        <label htmlFor={htmlFor}>
            {labelText}
            <input type={type} id={id} {...register(registerCallback, {...validationRules})} className={styles[className]} accept={accept}/>
            {errors[registerCallback] && <p className={styles['error-message']}>{errors[registerCallback].message}</p> }
        </label>

    )
}