import React, { useEffect, useState } from "react";

import styles from "../../styles/header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";
import SEARCH from "../../images/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { currentUser, cart } = useSelector(({ user }) => user);
  const { data, isLoading } = useGetProductsQuery({title: searchValue});
  console.log(data)
  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR })

  useEffect(() => {
    if(!currentUser) return;
    setValues(currentUser)
  }, [currentUser])

  const handleClick = () => {
    if(!currentUser) dispatch(toggleForm(true));
    else {
      navigate(ROUTES.PROFILE)
    }

  }
  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value)
  }
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="TeenGud" />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}>{values.name}</div>
        </div>
        <form className={styles.form}>
          <div className={styles.formBox}>
            <div className={styles.icon}>
              <img src={SEARCH} alt="Search" />
            </div>
            <div className={styles.input}>
              <input
                type="text"
                name="search"
                placeholder="Search for anything..."
                autoComplete="off"
                onChange={handleSearch}
                value={searchValue}
              />
            </div>
          </div>
          {searchValue && <div className={styles.box}>
              {isLoading ? "Loading..." : !data.length ? "No results" : (
                data.map(({ title, images, id }) => {
                  return <Link key={id} onClick={() => setSearchValue("")} className={styles.item} to={`/products/${id}`}>
                    <div className={styles.image} style={{backgroundImage: `url(${images[0]})`, width: 60, height: 60}}/>
                    <div className={styles.title}>{title}</div>
                  </Link>
                })
              )}
            </div>}
        </form>
        <div className={styles.account}>
          <Link  to={ROUTES.HOME} className={styles.favourites}>
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={styles.card}>
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10.9673M10.4 21H13.6C15.8402 21 16.9603 21 17.816 20.564C18.5686 20.1805 19.1805 19.5686 19.564 18.816C20 17.9603 20 16.8402 20 14.6V12.2C20 11.0799 20 10.5198 19.782 10.092C19.5903 9.71569 19.2843 9.40973 18.908 9.21799C18.4802 9 17.9201 9 16.8 9H7.2C6.0799 9 5.51984 9 5.09202 9.21799C4.71569 9.40973 4.40973 9.71569 4.21799 10.092C4 10.5198 4 11.0799 4 12.2V14.6C4 16.8402 4 17.9603 4.43597 18.816C4.81947 19.5686 5.43139 20.1805 6.18404 20.564C7.03968 21 8.15979 21 10.4 21Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {!!cart.length && (<span className={styles.count}>{cart.length}</span>)}
            {console.log("MY MOM", cart)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
