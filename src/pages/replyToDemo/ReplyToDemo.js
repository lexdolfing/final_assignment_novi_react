import styles from './ReplyToDemo.module.css';
import stylesIndex from '../../index.module.css'
import React, {useEffect, useState} from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";


export default function ReplyToDemo() {
    const {demoId} = useParams();
    const token = localStorage.getItem('token');
    const [demoData, setDemoData] = useState();
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm({
        mode: 'onTouched'
    });

    useEffect(() => {
        async function fetchDemoData() {
            try {
                const response = await axios.get(`http://localhost:8081/demos/${demoId}`, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                setDemoData(response.data)
                console.log("hieronder demo data")
                console.log(response.data)
            } catch (e) {
                console.error(e)
            }
        }

        void fetchDemoData();
    }, [])

    function handleFormSubmit(data) {

    }
    return (
        <section className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <article className={stylesIndex['inner-container']}>
                    <h1>Youre replying to the following demo</h1>
                    <h3>{demoData.artistName} - {demoData.songName}</h3>
                    <p>Notes of DJ: {demoData.songElaboration}</p>
                    <article className={stylesIndex['form-container']}>
                        <h1>Reply to demo</h1>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className={stylesIndex.form}>


                        </form>


                    </article>

                </article>
            </section>
        </section>
    )
}