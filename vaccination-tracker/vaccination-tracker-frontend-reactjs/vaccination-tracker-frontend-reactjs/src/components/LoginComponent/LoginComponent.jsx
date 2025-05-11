import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginComponent.css';

function LoginComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();
        localStorage.setItem("authenticated", true);
        // Perform login logic here
        console.log("Logging in with:", username, password);
        // Redirect to the home page after successful login
        if (username === "admin" && password === "admin") {
            navigate("/home");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <h2 className="text-center">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form className="login-form" onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input type="text" className="login-input-field" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" className="login-input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default LoginComponent;
