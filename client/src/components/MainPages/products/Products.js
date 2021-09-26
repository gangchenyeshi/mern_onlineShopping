import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import "./Products.css";
import Loader from "../utils/loading/Loader";
import axios from 'axios';
import Filters from './Filters';
import LoadMore from './LoadMore';

function Products() {
    const state = useContext(GlobalState);
    // console.log("state product :", state)
    const [products, setProducts] = state.productsAPI.products
    // console.log("products :", products)
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callBack, setCallBack] = state.productsAPI.callBack;
    const [loader, setLoader] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    //Check all
    const handleCheck = (id) => {
        console.log({ id })
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        });
        setProducts([...products])
    };

    //Delete Product
    const deleteProduct = async (id, public_id) => {
        console.log({ id, public_id })
        try {
            setLoader(true)
            const destroyImage = await axios.post('/api/destroy', { public_id }, {
                headers: {
                    authorization: token
                }
            })
            const deleteProduct = await axios.delete(`/api/products/${id}`, {
                headers: {
                    authorization: token
                }
            })
            await destroyImage
            await deleteProduct
            setCallBack(!callBack)
            setLoader(false)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    //Check All
    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        });
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    //Delete All
    const deleteAll = () => {
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    if (loader) return <div className="productCard"><Loader /></div>

    return (
        <div className="container-fluid">
            <Filters />
            {isAdmin &&
                <div className="deleteAll  mt-2 mb-2">
                    <span>Select All</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll} />
                    <button onClick={deleteAll} className="btn btn-danger">Delete All</button>
                </div>
            }
            <div className="row d-flex justify-content-start">
                {
                    products.map(product => (
                        <div className="col-6 col-md-4 col-lg-3">
                            <ProductItem key={product._id}
                                product={product}
                                isAdmin={isAdmin}
                                deleteProduct={deleteProduct}
                                handleCheck={handleCheck}
                            />
                        </div>
                    ))
                }
            </div>
            <div className="row mb-3">
                <LoadMore />
            </div>

            {products.length === 0 && <Loader />}
        </div>
    )
}

export default Products
