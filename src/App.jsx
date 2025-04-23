import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router";
import axiosInstance, { setAuthToken } from "./api/api";
import "./api/axiosSetup.js";
import { useAuth } from "./context/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import {useEffect} from "react";
import SinglePost from "./pages/SinglePost.jsx";

function App() {
    // Retrieving the setIsAuthenticated state from AuthContext
    const { setIsAuthenticated } = useAuth();

    const refreshAccessToken = async () => {
        try {
            const response = await axiosInstance.get("/api/users/refresh-token");
            const newAccessToken = response.data.accessToken;
            setAuthToken(newAccessToken);

            return newAccessToken;
        } catch (err) {
            console.error("Failed to refresh access token", err);
        }
    }

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const res = await refreshAccessToken();
                if (res)
                    setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
                console.error("User not logged in or refresh failed", err);
            }
        }

        initializeAuth();
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/posts/:id" element={<SinglePost />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
