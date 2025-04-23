import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./context/AuthContext";


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <SnackbarProvider>
                <App />
            </SnackbarProvider>
        </AuthProvider>
    </StrictMode>,
);
