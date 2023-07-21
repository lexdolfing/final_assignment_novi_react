import React, {useContext, useEffect, useState} from "react";
import stylesIndex from '../../index.module.css';
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";
import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import DemoOverviewTable from "../../components/demoOverviewTable/DemoOverviewTable";
import getMp3File from "../../helper functions/getMp3File/GetMp3File";
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

export default function DemoOverview() {
    const [demodata, setDemoData] = useState([]);
    const [mp3Selected, setMp3Selected] = useState();
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8081/demos`, {
                    headers: {
                        "Content-type" : "application/json",
                        Authorization : `Bearer ${token}`,
                    }
                });
                setDemoData(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchData();

    }, [])

    function handleNavigate() {
        navigate('/user-info')
    }


    return (
            <section className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <section className={stylesIndex['inner-container']}>
                    {user.username.includes("elevaterecords.nl") ?
                        <>
                        <h1>List of all the added demo's</h1>
                        <p>To see the list of the demo's that have been assigned to you, and reply to them, click <span onClick={handleNavigate} className={stylesIndex.link}>here</span></p>
                        </>
                        :
                        <h1>List of your demos</h1>
                    }


                    <DemoOverviewTable
                    demodata={demodata}
                    isDJ={false}
                    showButton={false}
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
