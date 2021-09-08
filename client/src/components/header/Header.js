import React, {useContext} from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from "react-router-dom";
import Menu from './icon/menu.svg';
import Closed from './icon/closed.svg';
import Cart from './icon/cart.svg';
import "./Header.css"

const Header = () => {
    const value = useContext(GlobalState);
    
    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="" width="30"/>
            </div>

            <div className="logo">
                <h1>
                    <Link>My Shop</Link>
                </h1>
            </div>

            <ul>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><img src={Closed} alt="" width="30" className="menu"/></li>
            </ul>

            <div className="cartIcon">
                <span>0</span>
                <Link to="/cart">
                    <img src={Cart} alt="" width="30" />
                </Link>
            </div>
        </header>
    )
}

export default Header;
