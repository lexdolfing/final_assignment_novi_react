import styles from './SignIn.module.css';
import stylesIndex from '../../index.module.css'
import stylesForm from '../dropDemo/DropDemo.module.css'
import React from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";
import {useForm} from "react-hook-form";
import FormInput from "../../components/formInput/FormInput";
import Button from "../../components/button/Button";


export default function SignIn() {
    const innerContainerClassName = `${stylesIndex['inner-container']}`;
    const formContainerClassName = `${innerContainerClassName} ${stylesForm['form-container']}`;
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm({
        mode: 'onTouched'
    });


    function handleFormSubmit (data) {
        console.log(data);
    }
    return (
        <>
            <body className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
            <section className={formContainerClassName}>
                <h1>If you have an account, you can sign in here</h1>


                <form onSubmit={handleSubmit(handleFormSubmit)} className={stylesForm.form}>
                    <FormInput
                        htmlFor="email-field"
                        labelText="E-mail address"
                        type="email"
                        id="email-field"
                        register={register}
                        registerCallback="email"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Fill in your e-mail address',
                            },
                            validate: (value) => {
                                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                                return isValidEmail || 'Fill in a correct e-mail address';
                            },
                        }}
                        errors={errors}
                        className='input'
                    />

                    <FormInput
                        htmlFor="password-field"
                        labelText="password"
                        type="password"
                        id="password-field"
                        register={register}
                        registerCallback="password"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Please enter a password',
                            },
                            minLength: {value: 8, message: 'Password must be at least 8 characters'},
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message:
                                    'Password must contain at least one letter and one number, and be at least 8 characters',
                            },
                        }}
                        errors={errors}
                        className='input'
                    />

                    <Button buttonType="onSubmit" onClick={handleSubmit} button_content="Send"
                            bigOrSmall="small-button"/>

                </form>

            </section>
            </section>

            <Footer />
            </body>
        </>
    )
}