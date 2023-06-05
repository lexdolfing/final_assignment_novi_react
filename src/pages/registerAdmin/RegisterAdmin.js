import styles from './RegisterAdmin.module.css';
import React from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import stylesIndex from "../../index.module.css";
import Footer from "../../components/footer/Footer";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import FormInput from "../../components/formInput/FormInput";
import Button from "../../components/button/Button";

export default function RegisterAdmin() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm({
        mode: 'onTouched'
    });

    const navigate = useNavigate();

    function handleFormSubmit(data) {
        void createTalentManager();

        async function createTalentManager() {
            try {
                const result = await axios.post("http://localhost:8081/talentmanager", {
                    managerName: data["manager-name"],
                    firstName: data["first-name"],
                    lastName: data["last-name"],
                    password: data.password,
                    email: data.email,
                })
                console.log(result)
                if (result.status === 200) {
                    navigate("/demo-overview")
                }
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <section className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <article className={stylesIndex['inner-container']}>
                    <article className={stylesIndex['form-container']}>
                    <h1>Register as an Admin here</h1>
                        <p>Create a talent manager profile here</p>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className={stylesIndex.form}>
                            <FormInput
                            htmlFor="manager-name-field"
                            labelText="Manager name (for privacy you can opt for an alias here"
                            type="text"
                            id="manager-name-field"
                            register={register}
                            registerCallback="manager-name"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Fill in your manager name",
                            }
                            }}
                            errors={errors}
                            className="input"
                            />

                            <FormInput
                            htmlFor="first-name-field"
                            labelText="First name"
                            type="text"
                            id="first-name-field"
                            register={register}
                            registerCallback="first-name"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Fill in your first name"
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
                                htmlFor="email-field"
                                labelText="E-mail address (must be an @elevaterecords.nl account)"
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

                            <Button buttonType="onSubmit" onClick={handleSubmit} button_content="Send"
                            bigOrSmall="small-button" />
                        </form>
                    </article>
                </article>
            </section>
            <Footer/>
        </section>
    )
}