import React from 'react';
import "./NotFound.css"

function NotFound() {
    return (
        <div className="container-fluid page">
            <div className="row  d-flex justify-content-center ">
                <h1 className="notFound">404</h1>
                <h2>Page Not Found</h2>
                <h3 class="h2">
                    Look like you're lost
                </h3>

                <p>the page you are looking for not avaible!</p>

                <a href="/" className="home_btn">Go to Home</a>
            </div>

        </div >
    )
}

export default NotFound
