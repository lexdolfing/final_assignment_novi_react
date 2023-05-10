import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from './ViewReply.module.css'
import {useParams} from "react-router-dom";
import stylesIndex from "../../index.module.css";
import NavigationBar from "../../components/navigationBar/NavigationBar";

export default function ViewReply() {
    const {id} = useParams();
    const [replyData, setReplyData] = useState([]);
    const [demoId, setDemoId] = useState();
    const [demoData, setDemoData] = useState([]);


    useEffect(() => {
            async function fetchData() {
                try {
                    const response = await axios.get(`http://localhost:8081/reply-to-demo/${id}`);
                    console.log(response);
                    setReplyData(response.data);
                    setDemoId(replyData.demoID);
                } catch (e) {
                    console.error(e);
                }
            }

            async function fetchDemoData() {
                try {
                    const response = await axios.get(`http://localhost:8081/demos/${demoId}`);
                    console.log(response);
                    setDemoData(response.data);
                } catch (e) {
                    console.error(e);
                }
            }

            void fetchData();
            void fetchDemoData();
        }, []
    )

    return (
        <body className={stylesIndex['page-body']}>
        <NavigationBar/>
        <section className={stylesIndex['outer-container']}>
            <section className={stylesIndex['inner-container']}>
                <article className={stylesIndex['form-container']}>
                    <h1>This is the admin reply to demo with title {demoData.songName}</h1>
                    <h2>Decision of the Talent Manager</h2>
                    <p>{replyData.adminDecision}</p>
                    <h2>Comments from the Talent Manager on the demo</h2>
                    <p>{replyData.adminComments}</p>
                </article>
            </section>
        </section>
        </body>

    )
}