import React from 'react'
import { Link } from "react-router-dom";
import "./ProductItem.css";

function BtnRender({ product }) {
    return (
        <div className="buttons">
            <Link id="btnBuy"
                className="btn btn-success"
                to="#!">
                Buy
            </Link>
            <Link id="btnView"
                className="btn btn-primary"
                to={`/product_detail/${product._id}`}>
                View
            </Link>
        </div>
    )
}

export default BtnRender
