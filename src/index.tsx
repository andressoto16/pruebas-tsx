import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "eco-unp/contexts";

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container!);

root.render(
    <>
        <AuthProvider>
            <App />
        </AuthProvider>
        <ToastContainer />
    </>
);