import './DropDemo.css';
import React from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import {useForm} from 'react-hook-form';
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/button";


export default function DropDemo() {
    const {register, handleSubmit} = useForm();

    function handleFormSubmit(data) {
        console.log(data);
    }


    return (
        <>
            <NavigationBar/>
            <section className="outer-container">
                <article className="inner-container form-container">
                    <h1>Demo drop</h1>
                    <p>Drop your demo here. <br/>
                        We will contact you within 14 days.</p>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <label htmlFor="artist-name-field">
                            Artist name(s)*
                            <input type="text" id="artist-name-field" {...register("artist-name")}/>
                        </label>
                        <label htmlFor="song-name-field">
                            Song name*
                            <input type="text" id="song-name-field" {...register("song-name")}/>
                        </label>
                        <label htmlFor="email-field">
                            E-mail address*
                            <input type="email" id="email-field" {...register("email")}/>
                        </label>
                        <label htmlFor="song-file-field">
                            File in .mp3 format*
                            <input type="file" id="song-file-field" {...register("song-file")}/>
                        </label>
                        <label htmlFor="demo-informarion-field">
                            Additional information about your demo
                            <textarea id="demo-information-field" cols="30" rows="10"
                                      placeholder="Tell us about what inspired you in producing this demo and what makes it unique"
                                      {...register("demo-information")}>
                        </textarea>
                        </label>
                        <Button buttonType="onSubmit" onClick={handleSubmit} button_content="Send" bigOrSmall="small-button" />
                    </form>
                </article>
            </section>
            <Footer/>
        </>
    )
}