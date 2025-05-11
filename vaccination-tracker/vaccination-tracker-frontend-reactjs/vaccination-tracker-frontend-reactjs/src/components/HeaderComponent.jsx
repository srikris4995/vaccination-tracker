import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderComponent = () => {
    const navigare = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authenticated");
        navigare("/, {replace: true}");
    }
    return(
        <div>
            <header>
                <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="hhtps://www.murali.com">Vaccination-Tracker</a>
                <Link to = '/dashboard' className="btn btn-light btn-smmx-1">Dashboard</Link>
                <Link to = '/students' className="btn btn-light btn-smmx-1">Manage Students</Link>
                <Link to = '/reports' className="btn btn-light btn-smmx-1">Reports</Link>
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent;