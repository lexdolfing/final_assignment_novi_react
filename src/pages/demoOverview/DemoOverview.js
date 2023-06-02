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
import DemoOverviewTable from "../../components/demoOverviewTable/DemoOverviewTable";


export default function DemoOverview() {
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

        void fetchData();

    }, [])

    return (
            <section className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <section className={stylesIndex['inner-container']}>
                    <h1>List of demo's</h1>

                    <DemoOverviewTable
                    demodata={demodata}
                    isDJ={false}
                    replyToDemo={() => replyToDemo()}
                    playSong={() => playSong()}
                    />

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
            </section>
    )
}
