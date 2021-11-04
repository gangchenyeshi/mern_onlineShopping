import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgetPassword from './auth/ForgetPassword';
import Cart from './cart/Cart';
import Products from './products/Products';
import ProductDetail from "./productsDetail/ProductDetail";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";
import NotFound from './utils/notFound/NotFound';


const MainPages = () => {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin]=state.userAPI.isAdmin;

    return (
        <Switch>
            <Route path="/" exact component={Products} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            
            <Route path="/forget_password" exact component={ForgetPassword} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/product_detail/:id" exact component={ProductDetail} />
            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default MainPages
