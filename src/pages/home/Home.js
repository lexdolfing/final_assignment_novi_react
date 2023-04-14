import './Home.css';
import '../../index.css'
import React from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import {NavLink, useNavigate} from "react-router-dom";
import Button from "../../components/button/button";
import Footer from "../../components/footer/Footer";

export default function Home() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/drop-your-demo");
    }

    return (<>
        <NavigationBar/>
        <body className="page-body">
        <section className="outer-container first-outer-container">
            <article className="inner-container first-section">
                <Button onClick={handleClick} button_content="Drop your demo here" bigOrSmall="big-button"/>
            </article>
        </section>

        <section className="outer-container">
            <article className="inner-container second-section">
                <h2>About Elevate Records</h2>
                <article className="pitch">
                <p className="pitch-paragraph">Welcome to Elevate Records, the Dutch record company that's all about helping talented DJs rise
                    to the top. Are you a DJ looking to take your music career to the next level? Then you've come
                    to the right place.
                </p>
                <p className="pitch-paragraph">
                    At Elevate Records, we're dedicated to finding the hottest new talent in the DJ scene. We know
                    that breaking into the music industry can be tough, but we believe that every talented DJ
                    deserves a chance to shine. That's why we've created an easy-to-use demo submission system that
                    makes it simple for you to get your music heard by our team.
                </p>
                <p className="pitch-paragraph">
                    When you drop a demo with Elevate Records, you'll get a response from us within 2 weeks. We'll
                    listen to your music and provide feedback to help you improve your skills and refine your sound.
                    We're here to support you every step of the way, whether you're just starting out or you're a
                    seasoned pro.
                </p>
                <p className="pitch-paragraph">
                    With our years of experience in the music industry, we know what it takes to succeed. We're
                    passionate about music and committed to helping talented DJs elevate their careers. So what are
                    you waiting for? Drop your demo today and let's make some magic together.
                </p>
                </article>
                <Button onClick={handleClick} button_content="Drop your demo here" bigOrSmall="small-button"/>
            </article>
        </section>

        {/*ADD FOOTER*/}
        </body>
        <Footer/>
    </>)
}