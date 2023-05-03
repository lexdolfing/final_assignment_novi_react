import React, {useEffect, useState} from "react";
import stylesIndex from '../../index.module.css';
import styles from './DemoOverview.module.css';
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import {useNavigate} from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import sampleMp3 from '../../assets/sample-3s.mp3'
import axios from "axios";


export default function DemoOverview() {
    const navigate = useNavigate();
    const [demodata, setDemoData] = useState([])
    const [mp3Selected, setMp3Selected] = useState(sampleMp3)

    function replyToDemo(demoId) {
        // Hier moet link naar pagina gaan met dynamische link naar reply-to-demo/{demoId}
    }

    function playSong(mp3File) {
        setMp3Selected(mp3File);
        console.log(mp3File);
    }

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8081/demos');
                console.log(response);
                setDemoData(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchData()

    }, [])

    return (
        <>
            <body className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <section className={stylesIndex['inner-container']}>
                    <h1>List of demo's</h1>

                    <table className={styles.table}>
                        <thead>
                        <tr className={styles['table-header']}>
                            <th>Reply</th>
                            <th>#</th>
                            <th>artist</th>
                            <th>title</th>
                            <th>song inspiration</th>
                        </tr>
                        </thead>
                        <tbody>
                        {demodata.map((demo) => {
                            return (
                                <tr key={demo.id} className={styles['demo-row']} onClick={() => playSong(demo.mp3File)}>
                                    <th><Button bigOrSmall="super-small-button" onClick={() => replyToDemo(demo.id)}
                                                button_content="Reply"
                                                buttonType="button"/></th>
                                    <td>{demo.id}</td>
                                    <td>{demo.artistName}</td>
                                    <td>{demo.songName}</td>
                                    <td>{demo.songElaboration}</td>
                                </tr>
                            )
                        })}
                        </tbody>

                    </table>

                </section>
            </section>
            <section className={stylesIndex['outer-container']}>
                <section className={stylesIndex['inner-container']}>

                    <ReactAudioPlayer
                        src={mp3Selected}
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
