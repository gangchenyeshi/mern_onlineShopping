import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from "react-router-dom";
import Menu from './icon/menu.svg';
import Closed from './icon/closed.svg';
import Cart from './icon/cart.svg';
import "./Header.css"

const Header = () => {
    const state = useContext(GlobalState);
    console.log('UseContext state :', state)

    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }
    const loggedUser = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/">Logout</Link></li>
            </>
        )
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
                <li><Link to="/">{isAdmin ? "Shop" : "Product"}</Link></li>
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
                    <span>0</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
        </header>
    )
}

export default Header;
