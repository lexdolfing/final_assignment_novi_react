import React, {useContext, useEffect, useState} from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";
import stylesIndex from "../../index.module.css";
import DemoOverviewTable from "../../components/demoOverviewTable/DemoOverviewTable";
import axios from "axios";
import {AuthContext} from "../../contexts/AuthContext";
import ReactAudioPlayer from "react-audio-player";
import getMp3File from "../../helper functions/getMp3File/GetMp3File";


export default function UserInfo() {
    const [demodata, setDemoData] = useState([]);
    const [userData, setUserData] = useState({});
    const {user, isAuthenticated} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [mp3Selected, setMp3Selected] = useState();



    useEffect( () => {


        async function fetchData() {
            try {
                const userResponse = await axios.get(`http://localhost:8081/dj/${user.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Hieronder de data van de DJ");
                console.log(userResponse.data)
                setUserData(userResponse.data);

                const demoResponse = await axios.get(`http://localhost:8081/demos/mydemos/${userResponse.data.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Hieronder demo data");
                console.log(demoResponse.data);
                setDemoData(demoResponse.data);
            } catch {
                const talentManagerResponse = await axios.get(`http://localhost:8081/talentmanager/userid/${user.id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                console.log("hieronder de data van de talentmanager")
                console.log(talentManagerResponse.data);
                setUserData(talentManagerResponse.data)
            }
        }

        if (isAuthenticated) {
            void fetchData();
        }
    }, []);


    return (
        <section className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <section className={stylesIndex['inner-container']}>
                    <h1>Profile information</h1>
                    {userData?.managerName ?
                        <> <h3>Manager name</h3>
                        <p>{userData.managerName}</p></>
                        :
                        <>
                    <h3>Artist name</h3>
                    <p>{userData.artistName}</p></>
                    }
                    <h3>Email address</h3>
                    <p>{user.username}</p>
                    <h3>Full name</h3>
                    <p>{userData.firstName} {userData.lastName}</p>

                    <h1>Below you find a list of demo's you dropped</h1>

                    {demodata ? <DemoOverviewTable
                        demodata={demodata}
                        isDJ={true}
                        seeReply={demodata.rereplyToDemoId}
                        setMp3Selected={setMp3Selected}
                        getMp3File={getMp3File}/>
                        :
                        <p>No demo's dropped yet. You can drop a demo <a href="/drop-your-demo">here</a></p>
                    }

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
    );
}