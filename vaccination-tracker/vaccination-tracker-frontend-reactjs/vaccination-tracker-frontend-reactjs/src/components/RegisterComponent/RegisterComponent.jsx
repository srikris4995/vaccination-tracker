import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/AuthService.jsx";
import './RegisterComponent.css';

function RegisterComponent() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student"); // Default role
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();
        setError("");
        setSuccess("");
        try {
            // Call the register API
            await register({ username, email, password, role });
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/"), 2000); // Redirect to login page after 2 seconds
        } catch (err) {
            // Handle error
            setError("Registration failed. Please try again.");
            console.error("Registration failed:", err);
        }
    }

    return (
        <div className="register-container">
            <h2 className="text-center">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form className="register-form" onSubmit={handleRegister}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        className="register-input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        className="register-input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        className="register-input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role</label>
                    <select
                        className="register-input-field"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="admin">Admin</option>
                        <option value="student">Student</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
            <button
                className="Register-form"
                onClick={() => navigate("/")}
            >
                Login
            </button>
        </div>
    );
}

export default RegisterComponent;