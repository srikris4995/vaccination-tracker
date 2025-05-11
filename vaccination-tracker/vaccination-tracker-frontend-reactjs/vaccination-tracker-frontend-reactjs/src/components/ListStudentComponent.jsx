import React from "react";
import { useState, useEffect } from "react";
import { listStudents } from "../services/StudentService";
import { useNavigate } from "react-router-dom";
const ListStudentComponents = () => {

    const [students, setStudents] =useState([])

    const naviagate = useNavigate();

    useEffect(() => {
        listStudents().then((response) => {
            setStudents(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    function addNewStudent() {
        naviagate("/add-students");
    }
    function updateStudent(id) {
        naviagate(`/update-students/${id}`);
    }
    return (
        <div className="container">
            <h2 className="text-center">List of students</h2>
            <button className="btn btn-secondary" onClick={addNewStudent}>Add Status</button>
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
                    {Array.isArray(students) &&
                        students.map((student) => 
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.className}</td>
                            <td>{student.vaccinationStatus}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => updateStudent(student.id)}>Update</button>
                
                            </td>
                            </tr>)
                    }
                    <tr>

                    </tr>
                </tbody>
            </table>
        </div>
      );
}
 
export default ListStudentComponents;