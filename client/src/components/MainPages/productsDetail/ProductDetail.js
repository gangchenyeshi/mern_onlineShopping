import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import "./ProductDetail.css";
import LoadMore from "../products/LoadMore";

function ProductDetail() {
    const params = useParams()
    console.log("Product Detail :", params)

    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    console.log("products API:", products)
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        console.log("re render")
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) {
                    console.log("show detail :", product)
                    setDetailProduct(product)
                }
            });
        }
    }, [params.id, products]);

    if (detailProduct.length === 0) return null;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-5">
                    <img src={detailProduct.images.url} alt=""
                        className="img-thumbnail rounded float-left"
                         />
                </div>
                <div className="col-12 col-md-6">
                    <h3>{detailProduct.title}</h3>
                    <h6>Product Id : {detailProduct.product_id}</h6>

                    <h6>Price : ${detailProduct.price}</h6>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <div className="row d-flex">
                        <div className="col-6">
                            <h6> Sold : {detailProduct.sold}</h6>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <Link id="btnBuy" className="btn btn-success btn-sm button-back" to="/">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row d-flex justify-content-start">
                <h2>Similar Products</h2>
                {
                    products.map(product => {
                        return product.category === detailProduct.category
                            ?
                            <div className="col-6 col-md-4 col-lg-3">
                                <ProductItem key={product._id} product={product} />
                            </div>
                            :
                            null
                    })
                }
            </div>
            <LoadMore />
        </div>
    )
}

export default ProductDetail;
