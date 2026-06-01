import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8081";
        
        axios.post(`${API_URL}/signup`, { username, password, role })
            .then((res) => {
                alert("Signup Successful! Please Login.");
                navigate("/login");
            })
            .catch((err) => {
                console.error("Signup error details:", err.response ? err.response.data : err.message);
                const msg = err.response && err.response.data && err.response.data.message 
                    ? err.response.data.message 
                    : "Check server connection";
                alert("Signup Failed: " + msg);
            });
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '100px auto' }}>
            <h2 className="page-title" style={{ textAlign: 'center', marginBottom: '32px' }}>Signup</h2>
            <form onSubmit={handleSignup}>
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
                <div className="input-group">
                    <label className="input-label">Role</label>
                    <select
                        className="input-field"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Signup</button>
            </form>
            <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};