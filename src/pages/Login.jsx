import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { setAuthToken } from "../api/api";
import { useAuth } from "../context/AuthContext.jsx";

// Toastifier
import { useSnackbar } from "notistack";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "../components/Navbar";

function Login() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    // Retrieving the setIsAuthenticated state from AuthContext
    const { setIsAuthenticated } = useAuth();

    // Form data useStates
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const onFormSubmit = async () => {
        try {
            const response = await axiosInstance.post(
                "/api/users/login",
                {
                    username,
                    pass,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            setAuthToken(response.data.accessToken);
            setIsAuthenticated(true);
            enqueueSnackbar("Logged in successfully!", { variant: "success" });
            navigate("/");
        } catch (error) {
            const msg =
                error.response?.data?.error || "Login failed. Try again";
            enqueueSnackbar(msg, { variant: "error" });
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="authForm">
                <div className="form-brand">
                    <h2>Login</h2>
                </div>
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-person"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-key"
                            viewBox="0 0 16 16"
                        >
                            <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-outline-light border border-3"
                    style={{ fontWeight: "800" }}
                    onClick={onFormSubmit}
                >
                    Login
                </button>

                <div className="form-query text-secondary">
                    <p>
                        Doesn't have an account?{" "}
                        <a href="/" className="link-secondary">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
