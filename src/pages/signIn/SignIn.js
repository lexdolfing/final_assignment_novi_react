import styles from './SignIn.module.css';
import stylesIndex from '../../index.module.css'
import stylesForm from '../dropDemo/DropDemo.module.css'
import React, {useContext, useState} from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";
import {useForm} from "react-hook-form";
import FormInput from "../../components/formInput/FormInput";
import Button from "../../components/button/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../contexts/AuthContext";


export default function SignIn() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [loginError, toggleLoginError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm({
        mode: 'onTouched'
    });
    async function handleFormSubmit(data) {
        console.log(data);
        try {
            const token = await signIn(data);
            login(token);
            console.log("sign-in succesfull")
        } catch (e) {
            console.error(e);
        }
    }

    async function signIn(data) {
        try {
            const result = await axios.post('http://localhost:8081/authenticate', {
                username : data.email,
                password : data.password,
            })
            // console.log(result.data);
            return result.data.jwt;
        } catch(e){
            toggleLoginError(true);
            console.error(e)
        }
    }

    function handleNavigate() {
        navigate('/sign-up')
    }



    return (
        <section className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <section className={stylesIndex['inner-container']}>
                    <article className={stylesIndex['form-container']}>
                        <h1>Sign in here</h1>
                        <p>Don't have an account yet? Click <span onClick={handleNavigate} className={stylesIndex.link}>here</span> to register</p>


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
                            {loginError && <p className={styles.error}> Email and/or password incorrect</p>}


                            <Button buttonType="submit" onClick={handleSubmit} button_content="Send"
                                    bigOrSmall="small-button"/>

                        </form>
                    </article>
                </section>
            </section>
            <Footer/>
            </section>
    )
}