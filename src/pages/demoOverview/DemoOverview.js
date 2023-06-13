import React, {useEffect, useState} from "react";
import stylesIndex from '../../index.module.css';
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";
import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import DemoOverviewTable from "../../components/demoOverviewTable/DemoOverviewTable";
import getMp3File from "../../helper functions/getMp3File/GetMp3File";

export default function DemoOverview() {
    const [demodata, setDemoData] = useState([]);
    const [mp3Selected, setMp3Selected] = useState();
    const token = localStorage.getItem('token');

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8081/demos`, {
                    headers: {
                        "Content-type" : "application/json",
                        Authorization : `Bearer ${token}`,
                    }
                });
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
                    setMp3Selected={setMp3Selected}
                    getMp3File={getMp3File}
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
