import React, { useEffect } from "react";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
import { filteredByPrice } from "../../features/products/productsSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { products, categories } = useSelector(( state ) => state)
    useEffect(() => {
        if(!products.list.length) return;
        dispatch(filteredByPrice(100))
    }, [dispatch, products.list.length])
    return (
        <div>
            <Poster />
            <Products products={products.list} amount={5} title="Trending"/>
            <Categories products={categories.list} amount={5} title="Worth seeing"/>
            <Banner />
            <Products products={products.filtered} amount={5} title="Less then 100$"/>
        </div>
    )
}

export default Home;