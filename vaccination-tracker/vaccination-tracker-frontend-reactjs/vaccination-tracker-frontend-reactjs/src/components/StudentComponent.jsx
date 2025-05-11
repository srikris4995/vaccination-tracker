import React, { useState, useEffect } from "react";
import { createStudent, getStudentById,
    updateStudent } from "../services/StudentService.jsx";
import { useNavigate, useParams } from "react-router-dom";

function StudentComponent() {
    const [name, setName] = useState("");
    const [className, setClassName] = useState("");
    const [vaccinationStatus, setVaccinationStatus] = useState(false);
    const [doseNumber, setDoseNumber] = useState("");
    const [gender, setGender] = useState("");
    const [vaccinationDate, setVaccinationDate] = useState("");

    const [error, setError] = useState({
        name: "",
        className: "",
        vaccinationStatus: "",
        doseNumber: "",
        gender: "",
        vaccinationDate: ""

    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getStudentById(id).then((response) => {
                const student = response.data;
                setName(student.name);
                setClassName(student.className);
                setVaccinationStatus(student.vaccinationStatus);
                setDoseNumber(student.doseNumber);
                setGender(student.gender);
                setVaccinationDate(student.vaccinationDate);

            }).catch((error) => {
                console.log(error);
            });
        }
    }, [id]);

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleClassName = (event) => {
        setClassName(event.target.value);
    };

    const handleVaccinationStatus = (event) => {
        setVaccinationStatus(event.target.checked);
    };

    const handleDoseNumber = (event) => {
        setDoseNumber(event.target.value);
    };

    const handleGender = (event) => {
        setGender(event.target.value);
    };

    const handleVaccinationDate = (event) => {
        setVaccinationDate(event.target.value);
    };

    const handleCancel = () => {
        navigate('/students');
    }

    function saveStudent(event) {
        event.preventDefault();
        if (validate()) {
            const student = { name, className, vaccinationStatus, doseNumber, gender, vaccinationDate };
            if (id) {
                updateStudent(id, student).then((response) => {
                    console.log(response.data);
                    navigate("/students");
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                createStudent(student).then((response) => {
                    console.log(response.data);
                    navigate("/students");
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }

    function validate() {
        let valid = true;
        const errorCopy = { ...error };
        if (name.trim()) {
            errorCopy.name = "";
        } else {
            errorCopy.name = "Name is required";
            valid = false;
        }
        if (className.trim()) {
            errorCopy.className = "";
        } else {
            errorCopy.className = "Class is required";
            valid = false;
        }
        if (vaccinationStatus !== null) {
            errorCopy.vaccinationStatus = "";
        } else {
            errorCopy.vaccinationStatus = "Vaccination Status is required";
            valid = false;
        }

        if (vaccinationStatus && !doseNumber) {
            errorCopy.doseNumber = "Dose number is required";
            valid = false;
        } else {
            errorCopy.doseNumber = "";
        }
        if (vaccinationStatus && !vaccinationDate) {
            errorCopy.vaccinationDate = "Vaccination date is required";
            valid = false;
        } else {
            errorCopy.vaccinationDate = "";
        }
        setError(errorCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update Student</h2>;
        } else {
            return <h2 className="text-center">Add Student</h2>;
        }
    }
    return (
        <div className="container">
            <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">Student Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Student Name"
                                    name="name"
                                    value={name}
                                    className={`form-control ${error.name ? "is-invalid" : ""}`}
                                    onChange={handleName}
                                />
                                {error.name && <div className="invalid-feedback">{error.name}</div>}
                            </div>
                    <div className="form-group mb-2">
                        <label className="form-label">Student Class Name</label>
                        <select
                            name="className"
                            value={className}
                            className={`form-control ${error.className ? "is-invalid" : ""}`}
                            onChange={handleClassName}
                        >
                            <option value="">Select Class</option>
                            {[...Array(12).keys()].map(i => (
                                <option key={i + 1} value={`Class ${i + 1}`}>{`Class ${i + 1}`}</option>
                            ))}
                        </select>
                        {error.className && <div className="invalid-feedback">{error.className}</div>}
                    </div>
                    <div className="form-group mb-2">
                        <label className="form-label">Gender</label>
                        <select
                            name="gender"
                            value={gender}
                            className={`form-control ${error.gender ? "is-invalid" : ""}`}
                            onChange={handleGender}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {error.gender && <div className="invalid-feedback">{error.gender}</div>}
                    </div>

                    <div className="form-group mb-2">
                                <label className="form-label">Student Vaccination Status</label>
                                <input
                                    type="checkbox"
                                    name="vaccinationStatus"
                                    checked={vaccinationStatus}
                                    className={`form-check-input ${error.vaccinationStatus ? "is-invalid" : ""}`}
                                    onChange={handleVaccinationStatus}
                                />
                                {error.vaccinationStatus && <div className="invalid-feedback">{error.vaccinationStatus}</div>}
                            </div>
                            {vaccinationStatus && (
                                <>
                                    <div className="form-group mb-2">
                                        <label className="form-label">Dose Number</label>
                                        <select
                                            name="doseNumber"
                                            value={doseNumber}
                                            className={`form-control ${error.doseNumber ? "is-invalid" : ""}`}
                                            onChange={handleDoseNumber}
                                        >
                                            <option value="">Select Dose Number</option>
                                            {[...Array(4).keys()].map(i => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        {error.doseNumber && <div className="invalid-feedback">{error.doseNumber}</div>}
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="form-label">Vaccination Date</label>
                                        <input
                                            type="date"
                                            name="vaccinationDate"
                                            value={vaccinationDate}
                                            className={`form-control ${error.vaccinationDate ? "is-invalid" : ""}`}
                                            onChange={handleVaccinationDate}
                                        />
                                        {error.vaccinationDate && <div className="invalid-feedback">{error.vaccinationDate}</div>}
                                    </div>
                                </>
                            )}
                            <button className="btn btn-success" onClick={saveStudent}>Submit</button>
                            <button className="btn btn-danger" onClick={handleCancel} style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentComponent;
