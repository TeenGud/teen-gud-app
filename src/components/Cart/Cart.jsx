import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/cart.module.css";
import { sumBy } from "../../utils/common";
import { addItemToCart, removeItemFromCart } from "../../features/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch()
  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({...item, quantity}))
  }
  const removeItem = (item) => {
    dispatch(removeItemFromCart(item))
  }
  const { cart } = useSelector(({ user }) => user);
  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>
      {!cart.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => {
              const { title, category, images, price, id, quantity } = item;
              console.log("YOOOO", item)
              // console.log('YOOOO', images[0])
              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    styles={{ backgroundImage: `url(${images[0]})`}}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>
                  <div className={styles.price}>{price}$</div>
                  <div className={styles.quantity}>
                    <div className={styles.minus} onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}>
                      <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                          stroke="white"
                          stroke-width="1.5"
                        />
                        <path
                          d="M15 12H9"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <span>{quantity}</span>
                    <div className={styles.plus} onClick={() => changeQuantity(item, quantity + 1)}>
                      <svg
                        width="36px"
                        height="36px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 12H15"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 9L12 15"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
                          stroke="white"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.total}>{price * quantity}$</div>
                  <div className={styles.delete} onClick={() => removeItem(item)}>
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                        stroke="white"
                        stroke-width="1.5"
                      />
                      <path
                        d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.actions}>
            <div className={styles.total_price}>
              TOTAL PRICE: {""}
              <span>{sumBy(cart.map(({ quantity, price }) => quantity * price))}$</span>
            </div>
            <button className={styles.proceed}>Proceed to ckeckout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
