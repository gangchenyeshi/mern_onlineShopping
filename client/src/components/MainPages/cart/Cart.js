import React, { useState, useContext, useEffect } from 'react';
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from 'axios';

const Cart = () => {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [total, setTotal] = useState(0);
    const [token] = state.token;


    //get the total amount
    useEffect(() => {
        const getTotal = () => {
            const totalAmount = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(totalAmount)
        }
        getTotal()
    }, [cart]);

    //Remove product in DB and backend
    const addToCard = async () => {
        await axios.patch("/user/addcart", { cart }, {
            headers: { authorization: token }
        })
    };

    //Increment the quantity
    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        });
        setCart([...cart]);
        addToCard();
    };
    //Decrement the quantity
    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ?
                    item.quantity = 1
                    : item.quantity -= 1
            }
        });
        setCart([...cart]);
        addToCard();
    };

    //remove product in cart
    const removeProductCart = id => {
        if(window.confirm("Do you want to delete this product from Cart"))
        cart.forEach((item, index)=>{
            if(item._id === id){
                cart.splice(index, 1)
            }
        })
        setCart([...cart]);
        addToCard();
    }

    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: '4rem' }}>Cart Empty</h2>

    return (
        <div className="container-fluid">
            {cart.map(product => (
                <div className="row mt-4 my-cart" key={product._id}>
                    <div className="col-4">
                        <img src={product.images.url} alt=""
                            className="img-thumbnail rounded float-left"
                        />
                    </div>
                    <div className="col-6 description">
                        <h3>{product.title}</h3>
                        <h6>Product Id : {product.product_id}</h6>

                        <span>$ {product.price * product.quantity}</span>
                        <p>{product.description}</p>
                        {/* <p>{product.content}</p> */}

                        <div className="row d-flex justify-content-start quantity">
                            <button className="col-1" onClick={() => decrement(product._id)}>-</button>
                            <span className="col-1">{product.quantity}</span>
                            <button className="col-1" onClick={() => increment(product._id)}>+</button>
                        </div>
                        <div className="delete" onClick={() => removeProductCart(product._id)}>
                            Remove X
                        </div>
                    </div>
                </div>
            ))}
            <div className="row d-flex justify-content-end align-items-center total mt-2 mb-4">
                <h5 className="col-6 col-md-2">Total : ${total}</h5>
                <Link className="col-6 col-md-2 payment btn btn-warning" to="#">
                    Payment
                </Link>
            </div>
        </div>
    )
}

export default Cart
