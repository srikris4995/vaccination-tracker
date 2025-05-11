import React from "react";
import { useState } from "react";
import { downloadVaccinationReport } from "../services/StudentService";
import BulkuploadComponent from "./BulkuploadComponent";


const ReportComponent = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
        const handleGenerateReport = () => {
            if (!startDate || !endDate) {
                alert("Please select both start and end dates.");
                return;
            }
    
            downloadVaccinationReport(startDate, endDate)
                .then((response) => {
                    // Create a link to download the file
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "vaccination_report.xlsx"); // File name
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                })
                .catch((error) => {
                    console.error("Error generating report:", error);
                    alert("Failed to generate the report. Please try again.");
                });
    };

    return(
        <>
        <br/>
        <div className="container p-4">
        <div className = "row">
        <div className ="col-sm-6 mb-3 mb-sm-0">
            <label>Start Date :
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} 
                required/>
            </label>
        </div>
        <div className ="col-sm-6 mb-3 mb-sm-0">
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </label>
            </div>
        </div>
        <br/>
        <div className ="d-grid gap-2">
           <button className ="btn btn-primary" type="button" onClick={handleGenerateReport}>Generate Report</button>
        </div>
        <br/>
        <div>
            <BulkuploadComponent/>
        </div>
        </div>
       
        </>
    )
    }

    export default ReportComponent;
