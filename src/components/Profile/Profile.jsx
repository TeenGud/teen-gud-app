import React, { useEffect, useState } from "react";

import styles from "../../styles/profile.module.css"
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
    const { currentUser } = useSelector(({ user }) => user)
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
        dispatch(updateUser(values))
    }
    useEffect(() => {
        if(!currentUser) return
        setValues(currentUser)
    }, [currentUser])
    return (
        <div className={styles.profile}>
            {!currentUser ? <span>You need to login</span> : (
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
                <button type="submit" className={styles.submit} onSubmit={handleSubmit}>
                    Update
                </button>
            </form> 
            )}
        </div>
    )
}

export default Profile