import React , {useState}from "react";
import { createStudent } from "../services/StudentService";
import { useNavigate, useParams} from "react-router-dom";

function StudentComponent() {
            const [name, setName] = useState("");
            const [className, setClassName] = useState("");
            const [vaccinationStatus, setVaccinationStatus] = useState("");

            const[error, setError] = useState(
                {
                    name: "",
                    className: "",
                    vaccinationStatus: ""
                }
            )
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleClassName = (event) => {
        setClassName(event.target.value);
    }
    const handleVaccinationStatus = (event) => {
        setVaccinationStatus(event.target.value);
    }

    const navigate = useNavigate();
    const {id} = useParams();

    function saveStudent(event) {
        event.preventDefault();
      if(validate()){
        const student = {name, className, vaccinationStatus};
        console.log(student);
        createStudent(student).then((response) => {
            console.log(response.data);
            navigate("/students");
        }).catch((error) => {
            console.log(error);
        })
      }
    }

    function validate() {
        let valid = true;
       const errorCopy ={...error}
        if(name.trim()){
            errorCopy.name = "";
        }else{
            errorCopy.name = "Name is required";
            valid = false;
        }
        if(className.trim()){
            errorCopy.className = "";
        }else{
            errorCopy.className = "Class is required";
            valid = false;
        }
        if(vaccinationStatus.trim()){
            errorCopy.vaccinationStatus = "";
        }
        else{
            errorCopy.vaccinationStatus = "Vaccination Status is required";
            valid = false;
        }
        setError(errorCopy);
        return valid;
    }

    function pageTitle() {
        if(id){
            return <h2 className="text-center">Update Student</h2>
    }else{
        return <h2 className="text-center">Add Student</h2>
        }
    }
    return (

        <div className="container">
            <br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">Student Name</label>
                                <input type="text"
                                       placeholder="Enter Student Name"
                                        name="name"
                                        value={name}
                                        className={`form-control ${error.name ? "is-invalid" : ""}`}
                                        onChange={handleName}
                                        ></input>
                                        {error.name && <div className="invalid-feedback">{error.name}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Student Class Name</label>
                                <input type="text"
                                       placeholder="Enter Student Class Name"
                                        name="name"
                                        value={className}
                                        className={`form-control ${error.className ? "is-invalid" : ""}`}
                                        onChange={handleClassName}
                                        ></input>
                                        {error.className && <div className="invalid-feedback">{error.className}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Student Vaccination Status</label>
                                <input type="text"
                                       placeholder="Enter Student Vaccination Status"
                                        name="name"
                                        value={vaccinationStatus}
                                        className={`form-control ${error.vaccinationStatus ? "is-invalid" : ""}`}
                                        onChange={handleVaccinationStatus}
                                        ></input>
                                        {error.vaccinationStatus && <div className="invalid-feedback">{error.vaccinationStatus}</div>}
                            </div>
                            <button className="btn btn-success" onClick={saveStudent}>Submit</button>
                        </form>

                    </div>
                </div>
             </div>

        </div>
    );
}

export default StudentComponent;