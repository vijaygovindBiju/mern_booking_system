import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8081";

        axios.post(`${API_URL}/login`, { username, password })
            .then((res) => {
                if (res.data.user) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    alert("Login Successful");
                    window.location.href = "/"; // Force refresh to update Navbar
                }
            })
            .catch((err) => {
                console.error("Login error details:", err.response ? err.response.data : err.message);
                const msg = err.response && err.response.data && err.response.data.message 
                    ? err.response.data.message 
                    : "Invalid credentials or server error";
                alert("Login Failed: " + msg);
            });
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '100px auto' }}>
            <h2 className="page-title" style={{ textAlign: 'center', marginBottom: '32px' }}>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label className="input-label">Username</label>
                    <input
                        type="text"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Password</label>
                    <input
                        type="password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
            </form>
            <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
};