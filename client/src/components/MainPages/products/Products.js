import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import "./Products.css";
import Loader from "../utils/loading/Loader"
function Products() {
    const state = useContext(GlobalState);
    // console.log("state product :", state)

    const [products] = state.productsAPI.products
    // console.log("products :", products)
    return (

        <div className="container-fluid">
            {products.length !== 0
                ? (
                    <div className="row d-flex justify-content-center">
                        {
                            products.map(product => (
                                <div className="col-6 col-md-4 col-lg-3">
                                    <ProductItem key={product._id} product={product} />
                                </div>

                            ))
                        }
                    </div>
                ) : (
                    <Loader />
                )
            }
        </div>
    )
}

export default Products
