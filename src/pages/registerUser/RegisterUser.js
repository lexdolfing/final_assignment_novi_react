import stylesIndex from '../../index.module.css'
import stylesSignIn from '../signIn/SignIn.module.css'
import React, {useState} from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";
import {useForm} from "react-hook-form";
import FormInput from "../../components/formInput/FormInput";
import Button from "../../components/button/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function RegisterUser() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm({
        mode: 'onTouched'
    });

    const navigate = useNavigate();
    const [registerError, toggleRegisterError] = useState(false);

    function handleFormSubmit(data) {
        console.log(data);
        void createDJ();
        async function createDJ() {
            try {
                const result = await axios.post("http://localhost:8081/dj", {
                    firstName : data["first-name"],
                    lastName : data["last-name"],
                    artistName : data["artist-name"],
                    password : data.password,
                    email : data.email,
                })
                console.log(result)
                if (result.status === 200) {
                    navigate("/sign-in")
                }
            } catch (e) {
                console.error(e);
                toggleRegisterError(true);
            }

        }
    }

    return (
        <section className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <article className={stylesIndex['inner-container']}>
                    <article className={stylesIndex['form-container']}>
                        <h1 className={stylesIndex['form-title']}>Demo drop registration</h1>
                        <p>Create a profile here to drop your first demo</p>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className={stylesIndex.form}>
                            <FormInput
                                htmlFor="first-name-field"
                                labelText="First name*"
                                type="text"
                                id="first-name-field"
                                register={register}
                                registerCallback="first-name"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "Fill in your first name",
                                    }
                                }}
                                errors={errors}
                                className='input'
                            />

                            <FormInput
                                htmlFor="last-name-field"
                                labelText="Last name*"
                                type="text"
                                id="last-name-field"
                                register={register}
                                registerCallback="last-name"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "Fill in your last name",
                                    }
                                }}
                                errors={errors}
                                className='input'
                            />

                            <FormInput
                                htmlFor="artist-name-field"
                                labelText="Artist name(s)*"
                                type="text"
                                id="artist-name-field"
                                register={register}
                                registerCallback="artist-name"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "Fill in artist name",
                                    }
                                }}
                                errors={errors}
                                className='input'
                            />

                            <FormInput
                                htmlFor="email-field"
                                labelText="E-mail address*"
                                type="email"
                                id="email-field"
                                register={register}
                                registerCallback="email"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'E-mail address is required',
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
                                labelText="password*"
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

                            <FormInput
                                htmlFor="confirm-password-field"
                                labelText="confirm password*"
                                type="password"
                                id="confirm-password-field"
                                register={register}
                                registerCallback="confirm-password"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'Please confirm your password',
                                    },
                                    validate: (value) =>
                                        value === getValues("password") || 'Passwords do not match',
                                }}
                                errors={errors}
                                className='input'
                            />

                            {registerError && <p className={stylesSignIn.error}>Email already used, please log in</p>}

                            <Button buttonType="onSubmit" onClick={handleSubmit} button_content="Send"
                                    bigOrSmall="small-button"/>
                        </form>
                    </article>
                </article>
            </section>
            <Footer/>
        </section>
    )
}