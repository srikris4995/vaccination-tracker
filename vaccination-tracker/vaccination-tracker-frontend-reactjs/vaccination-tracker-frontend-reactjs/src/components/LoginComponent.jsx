import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function LoginComponent(){
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
        if(username === "admin" && password === "admin"){
            navigate("/home");
        }else{
            setError("Invalid username or password");
        }
      
    };

   return(
    <div className="container">
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
            <div>
                <label>Username</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="btn-btn-primary">Login</button>
        </form>
        </div>
   )
}

export default LoginComponent;