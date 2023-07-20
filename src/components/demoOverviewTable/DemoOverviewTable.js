import React from "react";
import styles from './DemoOverviewTable.module.css'
import Button from "../button/Button";
import {useNavigate} from "react-router-dom";

export default function DemoOverviewTable({demodata, isDJ, getMp3File, showButton, setMp3Selected}) {
    const navigate = useNavigate();

    function seeReply(replyToDemoId) {
        navigate(`/view-reply/${replyToDemoId}`)
    }

    function replyToDemo(demoId) {
        navigate(`/reply-to-demo/${demoId}`)
    }

    return (
        <table className={styles.table}>
            <thead>
            <tr className={styles['table-header']}>
                {showButton ?
                    <th>Reply</th>
                    :
                    <th></th>
                }
                <th>#</th>
                <th>artist</th>
                <th>title</th>
                <th>song inspiration</th>
            </tr>
            </thead>
            <tbody>
            {demodata.map((demo) => {
                return (
                    <tr key={demo.id} className={styles['demo-row']}
                        onClick={() => getMp3File({demoId: demo.id, setMp3Selected})}>
                        {/* If user is DJ: show button with See reply (if there is one) or with "no reply yet"
                        Is user is no DJ (but admin) show button with "Reply"*/}
                        {showButton ? <>
                                {isDJ ? (demo.replyToDemoId ?
                                        <th><Button bigOrSmall="super-small-button" onClick={() => seeReply(demo.id)}
                                                    button_content="See reply"
                                                    type="button"/></th>
                                        :
                                        <th><Button bigOrSmall="super-small-button"
                                                    button_content="No reply yet"
                                                    type="button"/></th>
                                    )
                                    :
                                    (demo.replyToDemoId ?
                                        <th><Button bigOrSmall="super-small-button"
                                                    onClick={() => seeReply(demo.id)}
                                                    button_content="See reply"
                                                    type="button"/></th>
                                            :
                                        <th><Button bigOrSmall="super-small-button" onClick={() => replyToDemo(demo.id)}
                                                    button_content="Reply"
                                                    type="button"/></th>
                                    )}
                            </>
                            :
                            <p></p>
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