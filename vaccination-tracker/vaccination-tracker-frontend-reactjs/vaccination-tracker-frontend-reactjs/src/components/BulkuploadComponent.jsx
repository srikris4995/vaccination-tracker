import React, { useState } from 'react';
import { bulkUploadStudents } from '../services/StudentService';

const BulkuploadComponent = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        try {
            const response = await bulkUploadStudents(file);
            alert(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file: " + error.message);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Excel File</button>
        </div>
    );
};

export default BulkuploadComponent;
