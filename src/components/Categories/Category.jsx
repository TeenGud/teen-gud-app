import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import styles from "../../styles/category.module.css";
import Products from "../Products/Products";
import { useSelector } from "react-redux";

export const Category = () => {
  const [isEnd, setIsEnd] = useState(false);
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories)
  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 1000,
  }
  const defaultParams = {
    ...defaultValues,
    categoryId: id,
    limit: 5,
    offset: 0
  }
  const [ params, setParams ] = useState(defaultParams)
  const [values, setValues] = useState(defaultValues);
  const [items, setItems] = useState([])
  const { data, isLoading, isSuccess } = useGetProductsQuery(params);
  const [category, setCategory] = useState(null);
  useEffect(() => {
    if(!id) return;
    setItems([])
    setIsEnd(false)
    setValues(defaultValues)
    setParams({...defaultParams, categoryId: id})
  }, [id])
  useEffect(() => {
    if(!id || !list.length){
      return
    }
    setCategory(list.find((item) => item.id === id * 1))

  }, [list, id])

  useEffect(() => {
    if(isLoading) return
    if(!data.length) return setIsEnd(true)
    const products = Object.values(data)
    setItems((_items) => [..._items, ...products])
  }, [data, isLoading])

  const handleChange = ({target: {value, name}}) => {
    setValues({...values, [name]: value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setItems([])
    setIsEnd(false)
    setParams({...defaultParams, ...values})
  }
  const handleReset = () => {
    setValues(defaultValues)
    setParams(defaultParams)
    setIsEnd(false)
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{category?.name}</h2>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Product name"
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleChange}
            placeholder="0"
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="10000"
            value={values.price_max}
          />
          <span>Price to</span>
        </div>
        <button type="submit" hidden></button>
      </form>
      {isLoading ? (
        <div className={styles.preloader}>Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
            <span>No results</span>
            <button className={styles.back_button} onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products title="" products={items} amount={items.length} />
      )}
      {!isEnd && <div className={styles.more}>
        <button onClick={() => setParams({...params, offset: params.offset + params.limit})}>See more</button>
      </div>}
    </section>
  );
};
