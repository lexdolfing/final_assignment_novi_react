import React, {useEffect, useState} from "react";
import styles from './DJInfo.module.css';
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";
import stylesIndex from "../../index.module.css";
import DemoOverviewTable from "../../components/demoOverviewTable/DemoOverviewTable";
import axios from "axios";


export default function DJInfo() {
    const [demodata, setDemoData] = useState([]);


    //TO-DO get-request aanpassen naar alle demo's van een user.
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
        <body className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <section className={stylesIndex['inner-container']}>
                    <h1>Profile information</h1>
                    <h1>Here is a list of demo's for you my dear</h1>
                    <DemoOverviewTable
                    demodata={demodata}
                    isDJ={true}
                    seeReply={demodata.rereplyToDemoId}
                    />
                </section>
            </section>
            <Footer/>
        </body>
    );
}