import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './HeaderComponent.css'

const HeaderComponent = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authenticated");
        navigate("/", { replace: true });
    };

    return (
        <div className="header-container">
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/Home">Vaccination-Tracker</Link>
                    <div className="nav-links">
                        <Link to="/dashboard" className="btn btn-light btn-sm mx-1">Dashboard</Link>
                        <Link to="/students" className="btn btn-light btn-sm mx-1">Manage Students</Link>
                        <Link to="/reports" className="btn btn-light btn-sm mx-1">Reports</Link>
                        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default HeaderComponent;
