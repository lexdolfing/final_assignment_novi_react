import React, {useContext, useEffect, useState} from "react";
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
import {AuthContext} from "../../contexts/AuthContext";
import getMp3File from "../../helper functions/getMp3File/GetMp3File";

export default function DemoOverview() {
    const [demodata, setDemoData] = useState([]);
    const [mp3Selected, setMp3Selected] = useState(sampleMp3);
    const authContext = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();



    // function playSong(fileName, demoId) {
    //     async function fetchFileUrl(fileName) {
    //         try {
    //             const response = await axios.get(`http://localhost:8081/demos/${demoId}/download`, {
    //                 responseType: "blob",
    //             });
    //             const file = new Blob([response.data], { type: response.headers["content-type"]});
    //             const fileUrl = URL.createObjectURL(file);
    //             setMp3Selected(fileUrl);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //
    //     void fetchFileUrl();
    //
    // }



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
