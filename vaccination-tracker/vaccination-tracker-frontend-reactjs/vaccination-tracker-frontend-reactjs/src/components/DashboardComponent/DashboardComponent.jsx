import React, { useEffect } from "react";
import './DashboardComponent.css';
import { getTotalStudentsCount, getVaccinatedStudentsCount } from "../../services/StudentService.jsx";

const DashboardComponent = ({ upComingDrives }) => {
    const [totalStudents, setTotalStudents] = React.useState(0);
    const [vaccinatedCount, setVaccinatedCount] = React.useState(0);

    useEffect(() => {
        getTotalStudentsCount().then((response) => {
            setTotalStudents(response.data);
        }).catch((error) => {
            console.log(error);
        });

        getVaccinatedStudentsCount().then((response) => {
            setVaccinatedCount(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Total Students: {totalStudents}</h5>
                    <h5 className="card-title">Vaccinated Students: {vaccinatedCount}</h5>
                    <h5 className="card-title">Upcoming Drives: {upComingDrives}</h5>
                    <div className="scrolling-messages">
                        <p>Upcoming Drive: May 15th at Central Park</p>
                        <p>Upcoming Drive: May 20th at City Hall</p>
                        <p>Upcoming Drive: May 25th at Community Center</p>
                    </div>
                </div>
            </div>
            <div className="image-container">
                <img src='/vaccine.jpeg' alt='Vaccination' className="dashboard-image" />
            </div>
        </div>
    );
}

export default DashboardComponent;
