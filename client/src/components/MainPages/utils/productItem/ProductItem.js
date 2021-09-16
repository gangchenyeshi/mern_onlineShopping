import React from 'react';
import BtnRender from './BtnRender';
import "./ProductItem.css";

function ProductItem({ product, isAdmin }) {
    return (
        <div className="productCard">
            {
                isAdmin && <input type="checkbox" checked={product.checked} />
            }
            <img src={product.images.url} alt="" />

            <div className="productBox">
                <h3>{product.title}</h3>
                <span>$ {product.price}.00</span>
                <p>{product.description}</p>
            </div>
            <BtnRender product={product} />
        </div>
    )
}

export default ProductItem
