import React from "react";
import styles from './DemoOverviewTable.module.css'
import Button from "../button/Button";
import {useNavigate} from "react-router-dom";

export default function DemoOverviewTable({demodata, isDJ, replyToDemo, playSong, seeReply}) {
    const navigate = useNavigate();

    function seeReply(replyToDemoId) {
        navigate(`/view-reply/:${replyToDemoId}`)
    }

    return(
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
                        {isDJ ?<th><Button bigOrSmall="super-small-button" onClick={() => seeReply(demo.id)}
                                           button_content="See reply"
                                           buttonType="button"/></th>
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