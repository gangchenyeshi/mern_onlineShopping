import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

function ForgetPassword() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    };

    const submitPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/user/forget_password', { ...user })
            // localStorage.setItem("firstLogin", true)
            window.location.href = "/login"
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div className="container-fluid page">
            <div className="row">
            <h4 className="mt-3">Forget My Password</h4>
                <div className="col-12 col-md-5 col-lg-3 forms">
                    <form onSubmit={submitPassword}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail">Email address</label>
                            <input type="email"
                                name="email"
                                required
                                className="form-control"
                                id="exampleInputEmail"
                                placeholder="Enter email"
                                value={user.email}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword">New Password</label>
                            <input type="password"
                                name="password" required
                                className="form-control"
                                id="exampleInputPassword"
                                placeholder="Password"
                                value={user.password}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="btnLink">
                            <div className="row d-flex justify-content-between">
                                <button type="submit"
                                    className="btn btn-primary col-12">
                                    Change Password</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ForgetPassword
