import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    };

    const submitRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/register', { ...user })
            localStorage.setItem("firstLogin", true)
            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div className="container-fluid page">
            <div className="row">
                <h4 className="mt-3">Register New User</h4>
                <div className="col-12 col-md-5 col-lg-3 forms">
                    <form onSubmit={submitRegister}>
                        <div className="form-group">
                            <label htmlFor="exampleInputName">User Name</label>
                            <input type="text"
                                name="name"
                                required
                                className="form-control"
                                id="exampleInputName"
                                placeholder="Enter User Name"
                                value={user.name}
                                onChange={onChangeInput}
                            />
                        </div>
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
                            <label htmlFor="exampleInputPassword">Password</label>
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
                                    className="btn btn-primary col-12 col-sm-5">
                                    Register</button>
                                <Link to="/login" className="col-12 col-sm-5  link register">
                                    Login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register
