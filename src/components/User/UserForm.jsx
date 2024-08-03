import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSignUpForm from "./UserSignUpForm";
import styles from "../../styles/user.module.css"
import { toggleForm, toggleFormType } from "../../features/user/userSlice";
import UserLogInForm from "./UserLogInForm";

const UserForm = () => {
    const dispatch = useDispatch();
    const { showForm, formType } = useSelector(({ user }) => user)
    const closeForm = () => dispatch(toggleForm(false))
    const toggleCurrentFormType = (type) => dispatch(toggleFormType(type))
    return (
        showForm ?
        <>
            <div className={styles.overlay} onClick={closeForm}></div>
            {formType === "signup" ? <UserSignUpForm closeForm={closeForm} toggleCurrentFormType = {toggleCurrentFormType}/> : <UserLogInForm closeForm={closeForm} toggleCurrentFormType = {toggleCurrentFormType}/>}
        </> :
        <></>
    )
}

export default UserForm