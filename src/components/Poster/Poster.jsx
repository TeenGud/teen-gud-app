import React from "react";

import styles from "../../styles/home.module.css"

import BG from "../../images/pc.png"

const Poster = () => {
    return (
        <section className={styles.home}>
            <div className={styles.title}>BIG SALE 30%</div>
            <div className={styles.product}>
                <div className={styles.text}>
                    <div className={styles.subtitle}>The bestseller of {new Date().getFullYear()}</div>
                    <h1 className={styles.head}>ARDOR GAMING RAGE H335</h1>
                    <button className={styles.button}>Shop now</button>
                </div>
                <div className={styles.image}>
                    <img src={BG} alt="" width="600"/>
                </div>
            </div>
        </section>
    )
}

export default Poster