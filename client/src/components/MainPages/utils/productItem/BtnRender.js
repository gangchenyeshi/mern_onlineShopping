import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { GlobalState } from '../../../../GlobalState';
import "./ProductItem.css";

function BtnRender({ product }) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;

    return (
        <div className="buttons">
            {
                isAdmin ?
                    <>
                        <Link id="btnBuy"
                            className="btn btn-success"
                            to="#!">
                            Delete
                        </Link>
                        <Link id="btnView"
                            className="btn btn-primary"
                            to={`/edit_product/${product._id}`}>
                            Edit
                        </Link>
                    </>
                    :
                    <>
                        <Link id="btnBuy"
                            className="btn btn-success"
                            onClick={() => addCart(product)}>
                            Add to Cart
                        </Link>
                        <Link id="btnView"
                            className="btn btn-primary"
                            to={`/product_detail/${product._id}`}>
                            View
                        </Link>
                    </>
            }
        </div>
    )
}

export default BtnRender
