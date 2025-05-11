import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/students";

export const listStudents = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createStudent = (student) => {
    return axios.post(REST_API_BASE_URL, student);
}

export const getStudentById = (studentId) => {
    return axios.get(REST_API_BASE_URL + "/" + studentId);
}

export const getTotalStudentsCount = () => {
    return axios.get(REST_API_BASE_URL + "/count");
}

export const getVaccinatedStudentsCount = () => {
    return axios.get(REST_API_BASE_URL+"/vaccinated/count");
}

export const downloadVaccinationReport = (startDate, endDate) => {
    return axios.get(`${REST_API_BASE_URL}/vaccination-report`, {
        params: { startDate, endDate },
        responseType: "blob", // Ensures the response is treated as a file
    });
};


export const bulkUploadStudents = (file) => {
        const formData = new FormData();
        formData.append('file', file);
    
      return axios.post(`${REST_API_BASE_URL}/bulk-upload`, formData, {
      headers: {
       'Content-Type': 'multipart/form-data'
       }
     })
    }
    
