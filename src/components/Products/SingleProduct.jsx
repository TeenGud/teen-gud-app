import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateProductQuery, useGetProductQuery } from "../../features/api/apiSlice";
import { ROUTES } from "../../utils/routes";
import Product from "./Product";
import styles from "../../styles/single-product.module.css"
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProducts } from "../../features/products/productsSlice";

const SingleProduct = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate();
    const { list, related } = useSelector(({ products }) => products)
    const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
    useCreateProductQuery({
        title: "Nike Air Force 1 '07",
        price: 69.9,
        description: "An updated version of the classic leather basketball model. Stitched leather overlays on the upper provide durability and support for a classic look. Originally designed for basketball, Nike Air cushioning delivers lightweight, all-day comfort. Low-profile silhouette creates a minimalist look.",
        categoryId: 1,
        images: ["https://static.street-beat.ru/upload/resize_cache/iblock/c0e/500_500_1/fx090ukovdpxxs3b44nk510mjooo47a7.jpg"]
      })
    console.log(data)
    useEffect(() => {
        if(!isFetching && !isLoading && !isSuccess) {
            navigate(ROUTES.HOME)
        }
    }, [isLoading, isFetching, isSuccess, navigate])

    useEffect(() => {
        if(!data || !list.length) return;
        if(data){
            dispatch(getRelatedProducts(data.category.id))
        }
    }, [data, dispatch, list.length])
    return (
        !data ? 
        <section className={styles.preloader}>
            Loading...
        </section> :(
            <div className={styles.block}>
                <Product {...data}/> 
                <Products products={related} amount={5} title="Related products"/>
            </div>
        )
    )
}

export default SingleProduct