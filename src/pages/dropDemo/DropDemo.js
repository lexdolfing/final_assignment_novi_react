import styles from './DropDemo.module.css'
import stylesIndex from '../../index.module.css'
import React, {useContext, useState} from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import {useForm} from 'react-hook-form';
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import FormInput from "../../components/formInput/FormInput";
import axios from "axios";
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";


export default function DropDemo() {

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onTouched'
    });

    const {user, isAuthenticated} = useContext(AuthContext);
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const [djId, setDjId] = useState();

    async function handleFormSubmit(data) {
        console.log(data);

        try {
            const response = await axios.get(`http://localhost:8081/dj/${user.id}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Hieronder de data van de DJ")
            setDjId(response.data.id)
        } catch (e) {
            console.error(e);
        }

        try {
            const response = await axios.post('http://localhost:8081/demos', {
                artistName: data['artist-name'],
                songName: data['song-name'],
                email: data.email,
                songElaboration: data['demo-information'],
                djId: djId,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('hieronder de response')
            console.log(response)
            console.log(response.data);
            if (response.status === 200) {
                navigate('/user-info')
            }
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <section className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <article className={stylesIndex['inner-container']}>
                    <article className={stylesIndex['form-container']}>
                        <h1 className={stylesIndex['form-title']}>Demo drop</h1>
                        <p className={styles.info}>Drop your demo here. <br/>
                            We will contact you within 14 days.</p>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className={stylesIndex.form}>

                            <FormInput htmlFor="artist-name-field"
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
                            <FormInput htmlFor="song-name-field"
                                       labelText="Song name*"
                                       type="text"
                                       id="song-name-field"
                                       register={register}
                                       registerCallback="song-name"
                                       validationRules={{
                                           required: {
                                               value: true,
                                               message: 'Fill in the song name',
                                           }
                                       }}
                                       errors={errors}
                                       className='input'
                            />
                            <FormInput htmlFor="email-field"
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

                            <FormInput htmlFor="song-file-field"
                                       labelText="File in .mp3 format*"
                                       type="file"
                                       id="song-file-field"
                                       register={register}
                                       errors={errors}
                                       registerCallback="song-file"
                                       validationRules={{
                                           required: {
                                               value: true,
                                               message: 'Upload an .mp3 file',
                                           },
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
                                <textarea id="demo-information-field" cols="30" rows="10" className={styles.textarea}
                                          placeholder="Tell us about what inspired you in producing this demo and what makes it unique"
                                          {...register("demo-information", {
                                              maxLength: {
                                                  value: 1000,
                                                  message: "message can only contain 1000 signs",
                                              }
                                          })}>
                        </textarea>
                                {errors["demo-information"] &&
                                    <p className='error-message'>{errors["demo-information"].message}</p>}
                            </label>
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