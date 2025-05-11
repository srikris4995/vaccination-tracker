import React from "react";
import { useState, useEffect } from "react";
import { listStudents } from "../../services/StudentService.jsx";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './ListStudentComponent.css'; // Import the CSS file for styling

const ListStudentComponents = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [studentsPerPage] = useState(10);

    const navigate = useNavigate();

    useEffect(() => {
        listStudents().then((response) => {
            const sortedStudents = response.data.sort((a, b) => b.id - a.id);
            setStudents(sortedStudents);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    function addNewStudent() {
        navigate("/add-students");
    }

    function updateStudent(id) {
        navigate(`/update-students/${id}`);
    }

    function handlePageClick({ selected }) {
        setCurrentPage(selected);
    }

    const offset = currentPage * studentsPerPage;
    const currentStudents = students.slice(offset, offset + studentsPerPage);

    return (
        <div className="container">
            <h2 className="text-center">List of students</h2>
            <button className="btn btn-secondary" onClick={addNewStudent}>Add Student</button>
            <button className="btn btn-primary" onClick={() => setCurrentPage(0)}>
                Show Recent 10 Students
            </button>
            {currentPage === 0 && <p className="text-muted">Only the most recent 10 students are visible by default.</p>}
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Vaccination Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(currentStudents) &&
                    currentStudents.map((student) =>
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.className}</td>
                            <td>{student.vaccinationStatus ? "Vaccinated" : "Not Vaccinated"}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => updateStudent(student.id)}>Update</button>
                            </td>
                        </tr>)
                }
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={Math.ceil(students.length / studentsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default ListStudentComponents;
