import React from 'react';
import "./Footer.css";

function Footer() {
    return (
        <div className="container-fluid footer">
            <hr />
            <div className="mt-10 text-center ">
                Copyright @ YESHI TSERING GANHCHEN &nbsp; {new Date().getFullYear()}
            </div>
        </div>
    )
}
export default Footer

