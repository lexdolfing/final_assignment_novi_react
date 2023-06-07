import React, {useContext, useEffect, useState} from "react";
import styles from './DJInfo.module.css';
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";
import stylesIndex from "../../index.module.css";
import DemoOverviewTable from "../../components/demoOverviewTable/DemoOverviewTable";
import axios from "axios";
import {AuthContext} from "../../contexts/AuthContext";


export default function DJInfo() {
    const [demodata, setDemoData] = useState([]);
    const [djData, setDjData] = useState({});
    const {user, isAuthenticated} = useContext(AuthContext);
    const token = localStorage.getItem('token')


    useEffect( () => {


        async function fetchData() {
            try {
                const djResponse = await axios.get(`http://localhost:8081/dj/${user.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Hieronder de data van de DJ");
                console.log(djResponse.data)
                setDjData(djResponse.data);

                const demoResponse = await axios.get(`http://localhost:8081/demos/mydemos/${djResponse.data.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Hieronder demo data");
                console.log(demoResponse.data);
                setDemoData(demoResponse.data);
            } catch (error) {
                console.error(error);
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
                    <h3>Artist name</h3>
                    <p>{djData.artistName}</p>
                    <h3>Email address</h3>
                    <p>{user.username}</p>
                    <h3>Full name</h3>
                    <p>{djData.firstName} {djData.lastName}</p>

                    <h1>Below you find a list of demo's you dropped</h1>

                    {demodata ? <DemoOverviewTable
                        demodata={demodata}
                        isDJ={true}
                        seeReply={demodata.rereplyToDemoId}/>
                        :
                        <p>No demo's dropped yet. You can drop a demo <a href="/drop-your-demo">here</a></p>
                    }

                </section>
            </section>
            <Footer/>
        </section>
    );
}