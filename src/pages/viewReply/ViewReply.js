import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from './ViewReply.module.css'
import {useParams} from "react-router-dom";
import stylesIndex from "../../index.module.css";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";

export default function ViewReply() {
    const {id} = useParams();
    const [replyData, setReplyData] = useState([]);
    const [demoData, setDemoData] = useState([]);
    const token = localStorage.getItem('token');
    const [adminDecision, setAdminDecision] = useState('');
    const [customMessage, toggleCustomMessage] = useState(false);


    useEffect(() => {
            console.log("hieronder id");
            console.log(id);

            async function fetchData() {
                try {

                    const responseDemo = await axios.get(`http://localhost:8081/demos/${id}`, {
                        headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    console.log(responseDemo);
                    setDemoData(responseDemo.data);

                    const response = await axios.get(`http://localhost:8081/reply-to-demo/${responseDemo.data.replyToDemoId}`, {
                        headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    console.log(response);
                    setReplyData(response.data);

                    switch (response.data.adminDecision) {
                        case "decline" :
                            setAdminDecision("Your demo does not a good match with our record label");
                            break;
                        case "moreMaterial" :
                            setAdminDecision("We would like you to upload more demo's");
                            break;
                        case "interview" :
                            setAdminDecision("We liked your demo and would like to invite you to our studio");
                            break;
                        case "customMessage" :
                            toggleCustomMessage(true);
                            break;
                        default :
                            setAdminDecision("Something went wrong with the form, please contact us")
                            break;

                    }


                } catch (e) {
                    console.error(e);
                }
            }

            async function fetchDemoData() {
                try {

                } catch (e) {
                    console.error(e);
                }
            }

            void fetchData();
            void fetchDemoData();
        }, []
    )

    return (
        <section className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <section className={stylesIndex['inner-container']}>
                    <article className={stylesIndex['form-container']}>
                        <article className={styles['reply-container']}>
                        <h1>{demoData.artistName} {demoData.songName}</h1>
                        {customMessage ?
                            <p>Our talent manager has replied to your demo, see below for more information</p>
                            :
                            <>
                                <div className={styles['title-and-text-container']}>
                                <h2>Decision of the Talent Manager</h2>
                                <p>{adminDecision}</p>
                                </div>
                            </>

                        }
                        <div className={styles['title-and-text-container']}>
                        <h2>Comments from the Talent Manager on the demo</h2>
                        <p>{replyData.adminComments}</p>
                        </div>
                        </article>
                    </article>
                </section>
            </section>
            <Footer/>
        </section>

    )
}