import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login, setToken} from "../../services/AuthService.jsx";
import './LoginComponent.css';

function LoginComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        try {
            //call the login API
            const response = await login({username, password});
            //store the token
            setToken(response.data.token);
            //redirect to the home page
            navigate("/home");
        } catch (err) {
            //handle error
            setError("Invalid username or password");
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="login-container">
            <h2 className="text-center">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form className="login-form" onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input type="text" className="login-input-field" value={username}
                           onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" className="login-input-field" value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <button
                className="text-center"
                onClick={() => navigate("/register")}
            >
                Register
            </button>
        </div>
    );
}

export default LoginComponent;
