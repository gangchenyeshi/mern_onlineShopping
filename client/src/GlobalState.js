import React, { createContext, useState, useEffect } from 'react';
import ProductsAPI from './api/ProductsAPI';
import axios from "axios";
import UserAPI from './api/UserAPI';
import CategoriesAPI from './api/CategoriesAPI';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    const refreshToken = async () => {
        try {
            const res = await axios.get("/user/refresh_token")
            // console.log(res.data.accessToken)
            setToken(res.data.accessToken);

        } catch (err) {
            // alert(err.response.data.message)
        }
    };
    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin")
        if (firstLogin)
            refreshToken();
    }, []);
    
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}