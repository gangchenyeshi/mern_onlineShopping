import React, { useState, useEffect } from 'react';
import axios from "axios";

function CategoriesAPI() {
    const [categories, setCategories] = useState([]);
    const [callBack, setCallBack]=useState([]);

    const getCatagories = async () => {
        try {
            const res = await axios.get('/api/category')
            // console.log("Categorories :", res)
            setCategories(res.data)
        } catch (err) {
            console.log(err.response.data.msg)
        }
    };
    useEffect(() => {
        getCatagories()
    }, [callBack]);

    return {
        categories: [categories, setCategories],
        callBack: [callBack, setCallBack]
    }
}

export default CategoriesAPI
