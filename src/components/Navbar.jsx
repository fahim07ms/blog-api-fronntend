import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axiosInstance from "../api/api.js";

import { useSnackbar } from "notistack";
import {redirect, Link} from "react-router-dom";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post("/api/users/logout");
            logout();
            enqueueSnackbar(response.data.msg, { variant: "success" });
            redirect("/");
        } catch (error) {
            console.error("Failed to logout.", error);
        }
    }

    return (
        <nav
            data-bs-theme="dark"
            className="navbar navbar-expand-lg fixed-top bg-secondary-subtle"
        >
            <div className="container-fluid ps-5 pe-5">
                {/* Brand */}
                <a className="navbar-brand" href="#">
                    FMS Blog
                </a>

                {/* Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navlinks and sign-in */}
                <div
                    className="offcanvas offcanvas-end"
                    tabIndex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5
                            className="offcanvas-title"
                            id="offcanvasNavbarLabel"
                        >
                            FMS Blog
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#">
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#">
                                    Posts
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#">
                                    Contact
                                </a>
                            </li>
                            {isAuthenticated ? <li className="nav-item">
                                <a className="btn btn-outline-light border border-light border-3 ms-4" style={{ fontWeight: "800" }} onClick={handleLogout}>
                                    Logout
                                </a>
                            </li> :
                            <li
                                className="nav-item"
                            >
                                <Link className="btn btn-outline-light border border-light border-3 ms-4" style={{ fontWeight: "800" }} to="/login">
                                    Sign In
                                </Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
