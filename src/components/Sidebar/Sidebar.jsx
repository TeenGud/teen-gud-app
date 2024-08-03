import React from "react";
import styles from "../../styles/sidebar.module.css"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { truncate } from "../../utils/utils";

const Sidebar = () => {
    let { list } = useSelector(({ categories }) => categories)
    if(list.length === 0) list = undefined
    console.log(list)

    return (list &&
        <section className={styles.sidebar}>
            <div className={styles.title}>CATEGORIES</div>
            <nav>
                <ul className={styles.menu}>
                    {list.filter((_, index) => index < 11).map(({id, name}) => (
                    <li key={id} className={styles.liLink}>
                        <NavLink to={`/categories/${id}`} className={({isActive}) => `${isActive ? styles.active : ""}`}>
                            {truncate(name, 13)}
                        </NavLink>
                    </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.footer}>
                <a href="/help" target="blank" className={styles.link}>
                    Help
                </a>
                <a href="/terms" target="blank" className={styles.link} style={{textDecoration: "underline"}}>
                    Terms & Conditions
                </a>
            </div>
        </section>
    )
}

export default Sidebar