import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import "./Products.css";

function Products() {
    const state = useContext(GlobalState);
    // console.log("state product :", state)

    const [products] = state.productsAPI.products
    // console.log("products :", products)
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                {
                    products.map(product => (
                        <div className="col-6 col-md-4 col-lg-3">
                            <ProductItem key={product._id} product={product} />
                        </div>

                    ))
                }
            </div>

        </div>
    )
}

export default Products
