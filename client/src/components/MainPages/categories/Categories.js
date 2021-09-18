import axios from 'axios';
import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import "./Categories.css";

function Categories() {
    const state = useContext(GlobalState);
    const [categories, setCategories] = state.categoriesAPI.categories;
    const [category, setCategory] = useState('');
    const [token] = state.token;
    const [callBack, setCallBack] = state.categoriesAPI.callBack;
    const [onEdit, setOnEdit] = useState(false);
    const [id, setId] = useState('');

    const createCategory = async e => {
        e.preventDefault()
        try {
            if (onEdit) {
                const res = await axios.put(`/api/category/${id}`, { name: category }, {
                    headers: { authorization: token }
                })
                console.log("categories list : ", res);
                alert(res.data.message);
            } else {
                const res = await axios.post("/api/category", { name: category }, {
                    headers: { authorization: token }
                })
                console.log("categories list : ", res);
                alert(res.data.message);
            }
            setOnEdit(false);
            setCategory('');
            setCallBack(!callBack);
        } catch (err) {
            alert(err.response.data.msg)
        }
    };

    //Edit category
    const editCategory = async (id, name) => {
        setOnEdit(true);
        setCategory(name);
        setId(id);
    };
    //Delete Category
    const deleteCategory = async (id, name) => {
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: { authorization: token }
            })
            alert(res.data.message)
            setCallBack(!callBack)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="container-fluid">
            <h4>Category</h4>
            <div className="row d-flex justify-content-around mobile">
                <div className="col-12 col-md-7 addCategory">
                    <form onSubmit={createCategory}>
                        <div className="form-group row  d-flex justify-content-start">
                            <div className="col-12 col-md-3 formDiv mt-2">
                                <label htmlFor="addCategory"
                                    className="mt-1">
                                    Add Category
                                </label>
                            </div>
                            <div className="col-12 col-md-6 formDiv  mt-2">
                                <input type="text"
                                    className="form-control col-12 col-md-6"
                                    placeholder="Enter category"
                                    id="addCategory"
                                    name="category" required
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                />
                            </div>
                            <div className="col-12 col-md-2 formDiv  mt-2">
                                <div className="row">
                                    <button type="submit"
                                        className="btn btn-primary mb-2 col-12"
                                    >
                                        {onEdit ? "Update" : "Add"}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-12 col-md-4 editDelete">
                    <h4>Edit & Delete Category</h4>
                    {
                        categories.map(category => (
                            <div className="row d-flex justify-content-around" key={category._id}>
                                <p className="categoryName col-3  mt-2">{category.name}</p>
                                <button
                                    onClick={() => editCategory(category._id, category.name)}
                                    className="btn btn-warning categorybtn col-4  mt-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCategory(category._id)}
                                    className="btn btn-danger categorybtn col-4 mt-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Categories
