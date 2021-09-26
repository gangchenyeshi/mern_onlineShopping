import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";

function ProductsAPI() {
    const [products, setProducts] = useState([]);
    const [callBack, setCallBack] = useState(false);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);
    
    const getProducts = async () => {
        try {
            const res = await axios.get(
                `/api/products?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`
            )
            console.log("respond :", res)
            setProducts(res.data.products);
            setResult(res.data.result)
        } catch (err) {
            console.log(err.response.data.message)
        }
    };

    useEffect(() => {
        getProducts();
    }, [callBack, page, category, sort, search]);

    return {
        products: [products, setProducts],
        callBack: [callBack, setCallBack],
        category: [category, setCategory],
        sort: [sort, setSort],
        page: [page, setPage],
        search: [search, setSearch],
        result: [result, setResult],
    }
}

export default ProductsAPI;
