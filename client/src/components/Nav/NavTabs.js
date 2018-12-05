import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item justify-content-center">
                <h1>Google Books</h1>
            </li>
            <li className="nav-item">
                <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
                    Search
        </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/saved"
                    className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
                >
                    Saved
        </Link>
            </li>
        </ul>
    );
}

export default Nav;
