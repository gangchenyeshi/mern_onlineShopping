import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom"
import "./CreateProduct.css";

const initialState = {
    product_id: "",
    title: "",
    price: 0,
    description: "This is default description for the Product",
    content: "This is default content for the Product",
    category: "",
    _id: ''
}
function CreateProduct() {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [images, setImages] = useState(false);
    const [categories, setCategories] = state.categoriesAPI.categories;
    const [loader, setLoader] = useState(false);
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const history = useHistory();
    const param = useParams();
    const [products] = state.productsAPI.products;
    const [callBack, setCallBack] = state.productsAPI.callBack;
    const [onEdit, setOnEdit] = useState(false)

    //Edit for fetch
    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            products.forEach(product => {
                if (product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            });
        } else {
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])
    const styleUpload = {
        display: images ? "block" : "none"
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert('You are not an Admin');
            setLoader(false);
            await axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { authorization: token }
            })
            setLoader(true);
            setImages(false)
        } catch (err) {
            alert(err.response.data.message)
        }
    };
    const handleUpload = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert('You are not an Admin');
            const file = e.target.files[0]
            console.log("file :", file);
            if (!file) return alert("File not selected");

            if (file.size > 1024 * 1024)
                return alert('File size to large');

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert('Select the Correct file Format');

            let formData = new FormData()
            formData.append('file', file)

            setLoader(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    authorization: token
                }
            })
            setLoader(false)
            console.log("upload file :", res)
            setImages(res.data)
        } catch (err) {
            alert(err.response.data.message)
        }
    };
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert('You are not an Admin');
            if (!images) return alert('No image uploaded');
            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, images }, {
                    headers: { authorization: token }
                })
            } else {
                await axios.post('/api/products', { ...product, images }, {
                    headers: { authorization: token }
                })
            }
            // setImages(false)
            // setProduct(initialState)
            setCallBack(!callBack);
            history.push("/");
        } catch (err) {
            alert(err.response.data.message)
        }
    };
    const handleChangeInput = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
    }

    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-md-5">
                    <div className="upload">
                        <input type="file" name="file" id="file_up" onChange={handleUpload} />
                        <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ""} alt="" />
                            <span onClick={handleDestroy}>X</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row mt-2">
                            <label htmlFor="idProduct"
                                className="col-sm-2 col-form-label col-form-label-sm">
                                Product ID
                            </label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="idProduct" required
                                    placeholder="Enter the Product Id"
                                    name="product_id"
                                    onChange={handleChangeInput}
                                    disabled={onEdit}
                                    value={product.product_id}
                                />
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <label htmlFor="titleProduct"
                                className="col-sm-2 col-form-label col-form-label-sm">
                                Title
                            </label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="titleProduct" required
                                    placeholder="Enter the Product Title"
                                    name="title"
                                    onChange={handleChangeInput}
                                    value={product.title}
                                />
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <label htmlFor="priceProduct"
                                className="col-sm-2 col-form-label col-form-label-sm">
                                Price
                            </label>
                            <div className="col-sm-10">
                                <input type="number"
                                    className="form-control form-control-sm"
                                    id="priceProduct"
                                    name="price"
                                    onChange={handleChangeInput}
                                    value={product.price}
                                />
                            </div>
                        </div><div className="form-group row mt-2">
                            <label htmlFor="descriptionProduct"
                                className="col-sm-2 col-form-label col-form-label-sm">
                                Description
                            </label>
                            <div className="col-sm-10">
                                <textarea type="text"
                                    className="form-control form-control-sm"
                                    id="descriptionProduct" required
                                    row="7"
                                    name="description"
                                    onChange={handleChangeInput}
                                    value={product.description}
                                />
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <label htmlFor="contentProduct"
                                className="col-sm-2 col-form-label col-form-label-sm">
                                Content
                            </label>
                            <div className="col-sm-10">
                                <textarea type="text"
                                    className="form-control form-control-sm"
                                    id="contentProduct" required
                                    row="5"
                                    name="content"
                                    onChange={handleChangeInput}
                                    value={product.content}
                                />
                            </div>
                        </div>
                       
                        <div className="form-group row mt-2">
                            <label htmlFor="categoryProduct"
                                className="col-sm-2 col-form-label col-form-label-sm">
                                Category
                            </label>
                            <div className="col-sm-10">
                                <select  className="form-control"
                                    id="categoryProduct"
                                    value={product.category}
                                    name="category"
                                    onChange={handleChangeInput}
                                >
                                    <option value="">Please select a Category . . .</option>
                                    {
                                        categories.map(category => (
                                            // console.log("category :-",category)
                                            <option key={category.id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="btnLink">
                                <div className="row d-flex justify-content-between">
                                    <button type="submit"
                                        className="btn btn-primary col-12">
                                        {onEdit ? "Update" : "Create"}</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreateProduct
