import React from "react";
import styles from './DemoOverviewTable.module.css'
import Button from "../button/Button";
import {useNavigate} from "react-router-dom";

export default function DemoOverviewTable({demodata, isDJ, playSong, seeReply}) {
    const navigate = useNavigate();

    function seeReply(replyToDemoId) {
        navigate(`/view-reply/:${replyToDemoId}`)
    }

    function replyToDemo(demoId) {
        navigate(`/reply-to-demo/${demoId}`)
    }

    return (
        <table className={styles.table}>
            <thead>
            <tr className={styles['table-header']}>
                <th>Reply</th>
                <th>#</th>
                <th>artist</th>
                <th>title</th>
                <th>song inspiration</th>
            </tr>
            </thead>
            <tbody>
            {demodata.map((demo) => {
                return (
                    <tr key={demo.id} className={styles['demo-row']} onClick={() => playSong(demo.mp3File)}>
                        {/* If user is DJ: show button with See reply (if there is one) or with "no reply yet"
                        Is user is no DJ (but admin) show button with "Reply"*/}
                        {isDJ ? (demo.replyToDemo ?
                                <th><Button bigOrSmall="super-small-button" onClick={() => seeReply(demo.id)}
                                            button_content="See reply"
                                            buttonType="button"/></th> :
                                <th><Button bigOrSmall="super-small-button"
                                            button_content="No reply yet"
                                            buttonType="button"/></th>)
                            :
                            <th><Button bigOrSmall="super-small-button" onClick={() => replyToDemo(demo.id)}
                                        button_content="Reply"
                                        buttonType="button"/></th>
                        }

                        <td>{demo.id}</td>
                        <td>{demo.artistName}</td>
                        <td>{demo.songName}</td>
                        <td>{demo.songElaboration}</td>
                    </tr>
                )
            })}
            </tbody>

        </table>
    )
}