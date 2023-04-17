import React from 'react';


export default function FormInput({register, errors, htmlFor, type, id, registerCallback, labelText, validationRules}) {

    return (
        <label htmlFor={htmlFor}>
            {labelText}
            <input type={type} id={id} {...register(registerCallback, {...validationRules})}/>
            {errors[registerCallback] && <p className="error-message">{errors[registerCallback].message}</p> }
        </label>

    )
}