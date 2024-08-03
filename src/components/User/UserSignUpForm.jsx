import React, { useState } from "react";

import styles from "../../styles/user.module.css"
import { useDispatch } from "react-redux";
import { createUser } from "../../features/user/userSlice";

const UserSignUpForm = ({ closeForm, toggleCurrentFormType }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        avatar: ""
    })
    const handleChange = ({target: {value, name}}) => {
        setValues({...values, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const isNotEmpty = Object.values(values).every(val => val)
        if(!isNotEmpty) return;
        dispatch(createUser(values))
        closeForm()

    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={closeForm}>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.5" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5"/>
    <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </div>
            <div className={styles.title}>
                Sign Up
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <input required type="email" placeholder="Your email" name="email" value={values.email} autoComplete="off" onChange={handleChange}/>
                </div>
                <div className={styles.group}>
                    <input required type="name" placeholder="Your name" name="name" value={values.name} autoComplete="off" onChange={handleChange}/>
                </div>
                <div className={styles.group}>
                    <input required type="password" placeholder="Your password" name="password" value={values.password} autoComplete="off" onChange={handleChange}/>
                </div>
                <div className={styles.group}>
                    <input required type="avatar" placeholder="Your avatar" name="avatar" value={values.avatar} autoComplete="off" onChange={handleChange}/>
                </div>
                <div className={styles.link} onClick={() => toggleCurrentFormType('login')}>
                    I already have an account
                </div>
                <button type="submit" className={styles.submit}>
                    Create an account
                </button>
            </form> 
        </div>
    )
}

export default UserSignUpForm