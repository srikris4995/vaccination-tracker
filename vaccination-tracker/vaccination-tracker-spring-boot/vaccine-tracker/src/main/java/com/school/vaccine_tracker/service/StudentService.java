package com.school.vaccine_tracker.service;

import com.school.vaccine_tracker.dto.StudentDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

public interface StudentService {
    StudentDto createStudent(StudentDto studentDto);

    StudentDto getStudentById(StudentDto studentDto);

    List<StudentDto> getAllStudents();

    StudentDto updateStudent(Long studentId, StudentDto studentDto);

    void deleteStudentById(Long studentId);

    Long getTotalStudentsCount();

    Long getTotalVaccinatedStudentsCount();

    ByteArrayInputStream generateVaccinationReport(String startDate, String endDate) throws IOException;

    String bulkUploadStudents(MultipartFile file);

    StudentDto generateRandomStudentData();


}
