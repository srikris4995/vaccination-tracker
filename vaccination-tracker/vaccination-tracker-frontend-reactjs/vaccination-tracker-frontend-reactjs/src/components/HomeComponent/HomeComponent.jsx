import React from "react";
import './HomeComponent.css';
const HomeComponent = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Vaccine Tracker</h1>
            <p>Your one-stop solution for tracking vaccination drives.</p>
            <div className="scrolling-messages">
                <p>Upcoming Drive: May 15th at Central Park</p>
                <p>Upcoming Drive: May 20th at City Hall</p>
                <p>Upcoming Drive: May 25th at Community Center</p>
            </div>
            <img src='/vaccine.jpeg' alt="Vaccination" className="header-image" />
        </div>
    );
}

export default HomeComponent;
