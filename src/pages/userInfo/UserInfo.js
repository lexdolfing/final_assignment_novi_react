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
    const [isDJ, toggleIsDJ] = useState(false);


    useEffect(() => {


        async function fetchData() {
            try {
                const userResponse = await axios.get(`http://localhost:8081/djs/${user.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(userResponse.data);
                toggleIsDJ(true);

                const demoResponse = await axios.get(`http://localhost:8081/djs/${userResponse.data.id}/mydemos`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDemoData(demoResponse.data);
            } catch {
                const talentManagerResponse = await axios.get(`http://localhost:8081/talentmanagers/userid/${user.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(talentManagerResponse.data)

                const demoResponse = await axios.get(`http://localhost:8081/talentmanagers/${talentManagerResponse.data.id}/assigned-demos`, {
                    headers: {
                        "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                    },
                });
                setDemoData(demoResponse.data);
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

                    {userData?.managerName ?
                        <h1>Below you find a list of demo's that are assigned to you</h1>
                        :
                        <h1>Below you find a list of demo's you dropped</h1>
                    }

                    {demodata.length > 0 ?
                        <DemoOverviewTable
                            demodata={demodata}
                            isDJ={isDJ}
                            showButton={true}
                            seeReply={demodata.rereplyToDemoId}
                            setMp3Selected={setMp3Selected}
                            getMp3File={getMp3File}/>
                        :
                        <>{userData?.managerName ?
                            <p>There are no demo's assigned to you yet</p>
                            :
                            <p>No demo's dropped yet. You can drop a demo <a href="/drop-your-demo">here</a></p>}</>
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