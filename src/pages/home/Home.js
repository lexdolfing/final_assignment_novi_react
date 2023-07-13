import styles from './Home.module.css';
import stylesIndex from '../../index.module.css'
import React from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import {useNavigate} from "react-router-dom";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

export default function Home() {
    const navigate = useNavigate();
    const classNameOuterContainer = `${stylesIndex['outer-container']} ${styles['first-outer-container']}`
    const classNameInnerContainerOne = `${stylesIndex['inner-container']} ${styles['first-section']}`
    const classNameInnerContainerTwo = `${stylesIndex['inner-container']} ${styles['second-section']}`

    function handleClick() {
        navigate("/drop-your-demo");
    }

    return (
        <section className={stylesIndex['page-body']}>
        <NavigationBar/>

        <section className={classNameOuterContainer}>
            <article className={classNameInnerContainerOne}>
                <Button buttonType="button" onClick={handleClick} button_content="Drop your demo here" bigOrSmall="big-button"/>
            </article>
        </section>

        <section className={stylesIndex['outer-container']}>
            <article className={classNameInnerContainerTwo}>
                <h1>About Elevate Records</h1>
                <article className={styles.pitch}>
                    <p className={styles['pitch-paragraph']}>Welcome to Elevate Records, the Dutch record company that's
                        all about helping talented DJs rise
                        to the top. Are you a DJ looking to take your music career to the next level? Then you've come
                        to the right place.
                    </p>
                    <p className={styles['pitch-paragraph']}>
                        At Elevate Records, we're dedicated to finding the hottest new talent in the DJ scene. We know
                        that breaking into the music industry can be tough, but we believe that every talented DJ
                        deserves a chance to shine. That's why we've created an easy-to-use demo submission system that
                        makes it simple for you to get your music heard by our team.
                    </p>
                    <p className={styles['pitch-paragraph']}>
                        When you drop a demo with Elevate Records, you'll get a response from us within 2 weeks. We'll
                        listen to your music and provide feedback to help you improve your skills and refine your sound.
                        We're here to support you every step of the way, whether you're just starting out or you're a
                        seasoned pro.
                    </p>
                    <p className={styles['pitch-paragraph']}>
                        With our years of experience in the music industry, we know what it takes to succeed. We're
                        passionate about music and committed to helping talented DJs elevate their careers. So what are
                        you waiting for? Drop your demo today and let's make some magic together.
                    </p>
                </article>
                <Button buttonType="button" onClick={handleClick} button_content="Drop your demo here" bigOrSmall="small-button"/>
            </article>
        </section>

        <Footer/>
        </section>
    )
}