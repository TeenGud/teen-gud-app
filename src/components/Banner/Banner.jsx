import React from "react";

import styles from "../../styles/banner.module.css";

import BG from "../../images/summer.jpg";
import sale from "../../images/sale.png";
import sb from "../../images/SB.png";
import ps5 from "../../images/ps5.png";
import sneakers from "../../images/sneakers.png";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.left}>
        <p className={styles.content}>
          SUMMER
          <span>SALE</span>
        </p>
        <button className={styles.more}>See more</button>
      </div>
      <div className={styles.right} style={{ backgroundImage: `url(${BG})` }}>
        <img src={sale} alt="" className={styles.sale} width="400" />
        <img src={sb} alt="" className={styles.sb} width="200" />
        <img src={ps5} alt="" className={styles.ps5} width="130" />
        <img src={sneakers} alt="" className={styles.sneakers} width="160" />
        <p className={styles.discount}>
          save up to <span>50%</span> off
        </p>
      </div>
    </section>
  );
};

export default Banner;
