import React from "react";
import stylesIndex from '../../index.module.css';
import styles from './DemoOverview.module.css';
import NavigationBar from "../../components/navigationBar/NavigationBar";
import Footer from "../../components/footer/Footer";


export default function DemoOverview() {
    return (
        <>
            <body className={stylesIndex['page-body']}>
            <NavigationBar/>
            <section className={stylesIndex['outer-container']}>
                <section className={stylesIndex['inner-container']}>
                    <h1>List of demo's</h1>
                    <section className={styles['content-container']}>
                        <div className={styles['songs-container']}>
                            <article className={styles['demo-container']}>
                                <span className={styles.reply}>reply</span>
                                <span className={styles.number}>#</span>
                                <span className={styles.artist}>artist</span>
                                <span className={styles.title}>title</span>
                                <span className={styles.user}>dropped by</span>
                            </article>
                            <article>
                                //map for songs
                            </article>

                        </div>
                        <div className={styles['sort-by-container']}>
                            <span className={styles.sort}>Sort by</span>
                            <span>testkind</span>
                        </div>
                    </section>
                </section>
            </section>
            <Footer/>
            </body>
        </>
    )
}