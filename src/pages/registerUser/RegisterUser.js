import styles from './RegisterUser.module.css';
import stylesForm from '../dropDemo/DropDemo.module.css'
import stylesIndex from '../../index.module.css'
import stylesFormInput from '../../components/formInput/FormInput.module.css'
import React from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";
import {useForm} from "react-hook-form";
import FormInput from "../../components/formInput/FormInput";
import Button from "../../components/button/Button";

export default function RegisterUser() {
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

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <article className={formContainerClassName}>
                    <h1 className={stylesForm.formTitle}>Demo drop registration</h1>
                    <p>Create a profile here to drop your first demo</p>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                        <FormInput
                            htmlFor="profile-picture-field"
                            labelText="Profile picture"
                            type="file"
                            id="profile-picture-field"
                            register={register}
                            errors={errors}
                            registerCallback="profile-picture"
                            validationRules={{
                                validate: {
                                    maxSize: (fileList) =>
                                        fileList[0].size <= 5 * 1024 * 1024 ||
                                        'File size should be less than 5 MB',
                                    allowedTypes: (fileList) =>
                                        ['image.jpeg', 'image/png'].includes(fileList[0].type
                                        ) || 'Only JPEG and PNG files are allowed',
                                },
                            }}
                            className='input'
                            accept=".jpg, .jpeg, .png, .gif"
                        />

                        <FormInput
                            htmlFor="song-file-field"
                            labelText="First demo (optional) in .mp3"
                            type="file"
                            id="song-file-field"
                            register={register}
                            errors={errors}
                            registerCallback="song-file"
                            validationRules={{
                                validate: {
                                    mp3: file => {
                                        if (file[0].type !== 'audio/mpeg') {
                                            return 'Please upload an MP3 file';
                                        }
                                        return true;
                                    }
                                },
                            }}
                            className='input'
                        />
                        <label htmlFor="demo-informarion-field">
                            Additional information about your demo
                            <textarea id="demo-information-field" cols="30" rows="10" className={stylesForm.textarea}
                                      placeholder="Tell us about what inspired you in producing this demo and what makes it unique"
                                      {...register("demo-information", {
                                          maxLength: {
                                              value: 1000,
                                              message: "message can only contain 1000 signs",
                                          }
                                      })}>
                        </textarea>
                            {errors["demo-information"] &&
                                <p className={stylesFormInput['error-message']}>{errors["demo-information"].message}</p>}
                        </label>

                        <Button buttonType="onSubmit" onClick={handleSubmit} button_content="Send"
                                bigOrSmall="small-button"/>
                    </form>
                </article>
            </section>
            <Footer/>
        </>
    )
}