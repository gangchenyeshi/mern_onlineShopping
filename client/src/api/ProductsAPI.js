import React, { useState, useEffect } from 'react';
import axios from "axios";

function ProductsAPI() {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const res = await axios.get(`/api/products`)
            console.log("respond :", res.data)
            setProducts(res.data);
        } catch (err) {
            console.log(err.message)
        }
    };

    useEffect(() => {
        getProducts();
    }, [])


    return {
        products: [products, setProducts]
    }
}

export default ProductsAPI;
