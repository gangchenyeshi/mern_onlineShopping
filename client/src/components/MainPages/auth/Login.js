import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    };

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/login', { ...user })
            localStorage.setItem("firstLogin", true)
            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div className="container-fluid page">
            <div className="row  d-flex justify-content-center ">
                <div className="col-12 col-md-5 col-lg-3 forms">
                    <form onSubmit={submitLogin}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail"
                                className="mt-2">Email address</label>
                            <input type="email"
                                name="email"
                                required
                                className="form-control mt-1"
                                id="exampleInputEmail"
                                placeholder="Enter email"
                                value={user.email}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword"
                                className="mt-1">Password</label>
                            <input type="password"
                                name="password" required
                                className="form-control mt-1"
                                id="exampleInputPassword"
                                placeholder="Password"
                                value={user.password}
                                onChange={onChangeInput}
                            />
                        </div>

                        <div className="btnLink">
                            <div className="row d-flex justify-content-between">
                                <button type="submit"
                                    className="btn btn-primary col-12 col-sm-5">
                                    Login</button>
                                <Link to="/register" className="col-12 col-sm-5 link">
                                    Register</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
