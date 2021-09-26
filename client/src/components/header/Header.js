import React, { useContext, useState } from 'react';
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
    const [cart] = state.userAPI.cart;
    const [menu, setMenu] = useState(false);

    const adminRouter = () => {
        return (
            <>
                <li onClick={() => setMenu(!menu)}><Link to="/create_product">Create Product</Link></li>
                <li onClick={() => setMenu(!menu)}><Link to="/category">Categories</Link></li>
            </>
        )
    };
    const loggedUser = () => {
        return (
            <>
                <li onClick={() => setMenu(!menu)}><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    };
    const logoutUser = async () => {
        await axios.get('/user/logout')
        // localStorage.clear();
        localStorage.removeItem('firstLogin')
        window.location.href = "/"
    };


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? "Admin" : "My Shop"}</Link>
                </h1>
            </div>

            <ul style= {styleMenu}>
                <li onClick={() => setMenu(!menu)}><Link to="/">{isAdmin ? "Product" : "Shop"}</Link></li>
                {isAdmin && adminRouter()}
                {
                    isLogged
                        ? loggedUser()
                        :
                        <>
                            <li  onClick={() => setMenu(!menu)}><Link to="/login">Login</Link></li>
                            <li  onClick={() => setMenu(!menu)}><Link to="/register">Register</Link></li>
                        </>
                }

                {/* <li onClick={() => setMenu(!menu)}>
                    <img src={Closed} alt="" width="30" className="menu" />
                </li> */}
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
