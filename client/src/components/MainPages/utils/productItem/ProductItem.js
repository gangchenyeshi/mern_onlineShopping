import React from 'react';
import BtnRender from './BtnRender';
import "./ProductItem.css";

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {

    return (
        <div className="productCard">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                    onChange={() => handleCheck(product._id)}
                />
            }
            <img src={product.images.url} alt="" />

            <div className="productBox">
                <h3>{product.title}</h3>
                <span>$ {product.price}.00</span>
                <p>{product.description}</p>
            </div>
            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
    )
}

export default ProductItem
