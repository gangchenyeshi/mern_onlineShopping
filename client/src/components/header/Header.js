import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from "react-router-dom";
import Menu from './icon/menu.svg';
import Closed from './icon/closed.svg';
import Cart from './icon/cart.svg';
import "./Header.css"
import axios from 'axios';

const Header = () => {
    const state = useContext(GlobalState);
    console.log('UseContext state :', state)

    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    };
    const loggedUser = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    };
    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.clear()
        window.location.href = "/"
    }
    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? "Admin" : "My Shop"}</Link>
                </h1>
            </div>

            <ul>
                <li><Link to="/">{isAdmin ? "Product" : "Shop"}</Link></li>
                {isAdmin && adminRouter()}
                {
                    isLogged
                        ? loggedUser()
                        :
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                }

                <li><img src={Closed} alt="" width="30" className="menu" /></li>
            </ul>

            {isAdmin ? ''
                :
                <div className="cartIcon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
        </header>
    )
}

export default Header;
