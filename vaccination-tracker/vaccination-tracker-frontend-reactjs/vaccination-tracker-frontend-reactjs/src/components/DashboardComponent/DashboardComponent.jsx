import React, { useEffect,useState } from "react";
import './DashboardComponent.css';
import { getTotalStudentsCount,getVaccinatedStudentsCount } from "../../services/StudentService";
const DashboardComponent = ({upComingDrives}) => {
    const [totalStudents, setTotalStudents] = React.useState(0);
    const [vaccinatedCount, setVaccinatedCount] = React.useState(0);
    useEffect(() => {
        getTotalStudentsCount().then((response) => {
            setTotalStudents(response.data);
        }).catch((error) => {
            console.log(error);
        })
        getVaccinatedStudentsCount().then((response) => {
            setVaccinatedCount(response.data);
        }).catch((error) => {
            console.log(error);
        })
    })
    return (
        <div>
       <h2>Dashboard</h2>
         <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Students: {totalStudents}</h5>
                <h5 className="card-title">Vaccinated Students: {vaccinatedCount}</h5>
                <h5 className="card-title">Upcoming Drives: {upComingDrives}</h5>
              </div>
        </div>
        <div className="dashboard-container">
          <img src ='/vaccine.jpeg' alt='Vaccination' className="dashboard-image"></img>
        </div>
        </div>
    );
}

export default DashboardComponent;