import styles from './ReplyToDemo.module.css'
import stylesIndex from '../../index.module.css'
import React, {useContext, useEffect, useState} from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button";
import {AuthContext} from "../../contexts/AuthContext";


export default function ReplyToDemo() {
    const {demoId} = useParams();
    const token = localStorage.getItem('token');
    const [demoData, setDemoData] = useState();
    const [hasBeenSent, toggleHasBeenSent] = useState(false)
    const [talentManagerId, setTalentManagerId] = useState();
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        getValues,
        setValue
    } = useForm({
        mode: 'all'
    });
    const {user} = useContext(AuthContext)

    const replyOption = watch("replyOption");

    const defaultValues = {
        decline: "We are sorry to inform you that we will not consider your demo for further investigation.",
        moreMaterial: "We think your demo is very interesting. Before we consider working with you we would like you to upload more material.",
        interview: "We really enjoyed your demo. We would like to invite you to our studio to talk about cooperating with Elevate Studios on your music career.",
        customMessage: ""
    };

    useEffect(() => {
        setValue("additionalMessage", defaultValues[replyOption]);
    }, [replyOption, setValue]);


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

                const responseTalentManager = await axios.get(`http://localhost:8081/talentmanagers/userid/${user.id}`, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setTalentManagerId(responseTalentManager.data.id);
            } catch (e) {
                console.error(e)
            }
        }

        void fetchDemoData();
    }, [])

    function handleFormSubmit(data) {
    void postReply(data)
        async function postReply(data) {
        try {
            const response = await axios.post(`http://localhost:8081/replies-to-demos/${demoId}`,{
                adminDecision: data.replyOption,
                adminComments: data.additionalMessage,
                hasBeenRepliedTo: true,
                talentManagerId: talentManagerId,
                } ,
                {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
                )
            console.log(response)
            if (response.status === 200){
                toggleHasBeenSent(true);
            }
        } catch(e) {
            console.error(e)
        }
        }
    }



    return (
        <section className={stylesIndex['page-body']}>
            <NavigationBar />
            <section className={stylesIndex['outer-container']}>
                <article className={stylesIndex['inner-container']}>
                    <h1>You are replying to the following demo</h1>
                    <h3>{demoData?.artistName} - {demoData?.songName}</h3>
                    <p>Notes of DJ: {demoData?.songElaboration}</p>
                    <article className={stylesIndex['form-container']}>
                        <h1>Reply to demo</h1>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className={stylesIndex.form}>
                            <label htmlFor="replyOption" className={styles}>Select an option</label>
                            <select id="replyOption" {...register("replyOption", { required: true })}>
                                <option value="">Select an option:</option>
                                <option value="decline">Decline</option>
                                <option value="moreMaterial">Ask for more material</option>
                                <option value="interview">Invite DJ for interview</option>
                                <option value="customMessage">Custom message</option>
                            </select>

                            {replyOption === "customMessage" && (
                                <div>
                                    <label htmlFor="customMessage">Custom message:</label>
                                    <textarea id="customMessage" {...register("customMessage", { required: true })} />
                                </div>
                            )}

                            {["decline", "moreMaterial", "interview"].includes(replyOption) && (
                                <div>
                                    <label htmlFor="additionalMessage">Additional message:</label>
                                    <textarea
                                        id="additionalMessage"
                                        cols="30" rows="10"
                                        {...register("additionalMessage", { required: true })}
                                        defaultValue={defaultValues[replyOption]}
                                        className={stylesIndex.textarea}
                                    />
                                </div>
                            )}

                            <Button button_content="Send" type="submit" onClick={handleSubmit} bigOrSmall="small-button"/>

                        </form>
                        {hasBeenSent && <p>De reactie is succesvol verzonden!</p>}
                    </article>
                </article>
            </section>
        </section>
    );
}