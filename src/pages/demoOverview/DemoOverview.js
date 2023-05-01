import React from "react";
import stylesIndex from '../../index.module.css';
import styles from './DemoOverview.module.css';
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import {useNavigate} from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import sampleMp3 from '../../assets/sample-3s.mp3'


export default function DemoOverview() {
    const navigate = useNavigate();

    function replyToDemo() {
        // navigate('/reply-to-demo')
    }

    return (
        <>
            <body className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <section className={stylesIndex['inner-container']}>
                    <h1>List of demo's</h1>

                    <table className={styles.table}>
                        <thead>
                        <tr  className={styles['table-header']}>
                            <th>Reply</th>
                            <th>#</th>
                            <th>artist</th>
                            <th>title</th>
                            <th>dropped by</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*//map for songs, now hardcoded one*/}
                        <tr onClick={replyToDemo} className={styles['demo-row']}>
                            <th><Button bigOrSmall="super-small-button" onClick={replyToDemo} button_content="Reply"
                                        buttonType="button"/></th>
                            <td>1</td>
                            <td>Lorem Ipsum</td>
                            <td>Dolor sit amet consectetur</td>
                            <td>Lorem Ipsum</td>
                        </tr>
                        <tr>
                            <th><Button bigOrSmall="super-small-button" onClick={replyToDemo} button_content="Reply"
                                        buttonType="button"/></th>
                            <td>1</td>
                            <td>Lorem Ipsum</td>
                            <td>Dolor sit amet consectetur</td>
                            <td>Lorem Ipsum</td>
                        </tr>
                        <tr>
                            <th><Button bigOrSmall="super-small-button" onClick={replyToDemo} button_content="Reply"
                                        buttonType="button"/></th>
                            <td>1</td>
                            <td>Lorem Ipsum</td>
                            <td>Dolor sit amet consectetur</td>
                            <td>Lorem Ipsum</td>
                        </tr>
                        <tr>
                            <th><Button bigOrSmall="super-small-button" onClick={replyToDemo} button_content="Reply"
                                        buttonType="button"/></th>
                            <td>1</td>
                            <td>Lorem Ipsum</td>
                            <td>Dolor sit amet consectetur</td>
                            <td>Lorem Ipsum</td>
                        </tr>

                        </tbody>

                    </table>

                </section>
            </section>
            <section className={stylesIndex['outer-container']}>
                <section className={stylesIndex['inner-container']}>

            <ReactAudioPlayer
                src={sampleMp3}
                autoPlay={false}
                controls={true}
            />
                </section>
            </section>
            <Footer/>
            </body>
        </>
    )
}
