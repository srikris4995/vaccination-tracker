package com.school.vaccine_tracker.controller;

import com.school.vaccine_tracker.dto.StudentDto;
import com.school.vaccine_tracker.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/students")
public class StudentController {
    private StudentService studentService;

    //build rest API
    @PostMapping
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto) {
        //this will create a new student from the studentDto(client)
        StudentDto savedStudent = studentService.createStudent(studentDto);
        //this will return the created student as a response
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    //build get student by id API
    @GetMapping("/{id}")
    public ResponseEntity<StudentDto> getStudentById(@PathVariable("id") Long id) {
        //this will get the student from the database
        StudentDto studentDto = new StudentDto();
        studentDto.setId(id);
        StudentDto student = studentService.getStudentById(studentDto);
        //this will return the student as a response
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    //build get all students API
    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> studentDtos = studentService.getAllStudents();
        return ResponseEntity.ok(studentDtos);
    }

    //build update student API
    @PutMapping("/{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable("id") Long id, @RequestBody StudentDto studentDto) {
        StudentDto savedStudent = studentService.updateStudent(id, studentDto);
        return ResponseEntity.ok(savedStudent);

    }

    //build delete studebt API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") Long id) {
        studentService.deleteStudentById(id);
        return ResponseEntity.ok("Student deleted successfully");
    }

    //build total students count api
    @GetMapping("/count")
    public ResponseEntity<Long> getTotalStudentsCount() {
        Long count = studentService.getTotalStudentsCount();
        return ResponseEntity.ok(count);
    }

    //buuild vaccinated students count api
    @GetMapping("/vaccinated/count")
    public ResponseEntity<Long> getVaccinatedStudentsCount() {
        Long count = studentService.getTotalVaccinatedStudentsCount();
        return ResponseEntity.ok(count);
    }

    //build generate vaccination report api
    @GetMapping("/vaccination-report")
    public ResponseEntity<byte[]> generateVaccinationReport(@RequestParam String startDate, @RequestParam String endDate) {
        try {
            ByteArrayInputStream report = studentService.generateVaccinationReport(startDate, endDate);
            byte[] reportBytes = report.readAllBytes();

            // Set headers for Excel file
            return ResponseEntity.ok()
                    .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                    .header("Content-Disposition", "attachment; filename=\"vaccination_report.xlsx\"")
                    .body(reportBytes);
        } catch (IOException e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Error generating vaccination report: " + e.getMessage()).getBytes());
        }
    }

    @PostMapping("/bulk-upload")
    public ResponseEntity<String> bulkUploadStudents(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please upload a valid Excel file.");
        }

        try {
            String result = studentService.bulkUploadStudents(file);
            return ResponseEntity.ok(result);
           } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing the file: " + e.getMessage());
        }
    }

    @GetMapping("/randomData")
    public ResponseEntity<StudentDto> generateRandomData() {
        // Call the service method to generate random data
        StudentDto result = studentService.generateRandomStudentData();
        return ResponseEntity.ok(result);
    }

}
