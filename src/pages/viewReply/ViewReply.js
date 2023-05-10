import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import stylesIndex from "../../index.module.css";
import NavigationBar from "../../components/navigationBar/NavigationBar";

export default function ViewReply() {
    const {id} = useParams();
    const [replyData, setReplyData] = useState([]);


    useEffect(() => {
            async function fetchData() {
                try {
                    const response = await axios.get(`http://localhost:8081/reply-to-demo/${id}`);
                    console.log(response);
                    setReplyData(response.data);
                } catch (e) {
                    console.error(e);
                }

            }

            void fetchData();
        }, []
    )

    return (
        <body className={stylesIndex['page-body']}>
        <NavigationBar />
        <h1>View reply to demo page</h1>
        <p>Het Id nummer van de reply is {id}</p>

        </body>

    )
}