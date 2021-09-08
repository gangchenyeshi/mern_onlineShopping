import React from 'react';
import { Link } from 'react-router-dom';
import "./ProductItem.css";

function ProductItem({ product }) {
    return (
        <div className="productCard">
            <img src={product.images.url} alt="" />

            <div className="productBox">
                <h3>{product.title}</h3>
                <span>$ {product.price}.00</span>
                <p>{product.description}</p>
            </div>

            <div className="buttons">
                <Link id="btnBuy" className="btn btn-primary" to="#!">
                    Buy
                </Link>
                <Link id="btnView" class="btn btn-success" to="#">
                    View
                </Link>
            </div>
        </div>

    )
}

export default ProductItem
