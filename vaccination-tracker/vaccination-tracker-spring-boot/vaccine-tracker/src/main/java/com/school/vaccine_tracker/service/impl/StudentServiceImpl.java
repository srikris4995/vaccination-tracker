package com.school.vaccine_tracker.service.impl;

import com.school.vaccine_tracker.dto.StudentDto;
import com.school.vaccine_tracker.entity.Student;
import com.school.vaccine_tracker.mapper.StudentMapper;
import com.school.vaccine_tracker.repository.StudentRepository;
import com.school.vaccine_tracker.service.StudentService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {
    private StudentRepository studentRepository;
    @Override
    @Transactional
    public StudentDto createStudent(StudentDto studentDto) {
        //this will create a new student from the studentDto(client)
        Student student = StudentMapper.mapToStudent(studentDto);
        //this will save the student to the database
        Student savedStudent = studentRepository.save(student);
        //this will return the saved student as a studentDto
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentById(StudentDto studentDto) {
        //this will get the student from the database
        Student student = studentRepository.findById(studentDto.getId()).orElseThrow(() -> new RuntimeException("Student not found with id: " + studentDto.getId()));
        //this will return the student as a studentDto
        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students= studentRepository.findAll();
        return students.stream().map(StudentMapper::mapToStudentDto).collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto studentDto) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
        student.setName(studentDto.getName());
        student.setClassName(studentDto.getClassName());
        student.setVaccinationStatus(studentDto.isVaccinationStatus());
        Student updatedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updatedStudent);

    }

    @Override
    public void deleteStudentById(Long studentId) {
        //this will delete the student from the database
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
        studentRepository.deleteById(studentId);

    }

    @Override
    public Long getTotalStudentsCount() {
        return studentRepository.count();
    }

    @Override
    public Long getTotalVaccinatedStudentsCount() {
        return studentRepository.countByVaccinationStatus(true);
    }

    @Override
    public ByteArrayInputStream generateVaccinationReport(String startDate, String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        // Filter students based on vaccination status and date range
        List<Student> students = studentRepository.findAll().stream()
                .filter(student -> student.isVaccinationStatus() &&
                        (student.getVaccinationDate() != null &&
                                !student.getVaccinationDate().isBefore(start) &&
                                !student.getVaccinationDate().isAfter(end)))
                .collect(Collectors.toList());

        Workbook workbook = new XSSFWorkbook();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            String timestamp = java.time.LocalDateTime.now()
                    .format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String sheetName = "vaccination_report_" + timestamp;
            Sheet sheet = workbook.createSheet(sheetName);

            // Create header row
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("ID");
            headerRow.createCell(1).setCellValue("Name");
            headerRow.createCell(2).setCellValue("Class");
            headerRow.createCell(3).setCellValue("Vaccination Date");

            // Populate rows with student data
            int rowIndex = 1;
            for (Student student : students) {
                Row row = sheet.createRow(rowIndex++);
                row.createCell(0).setCellValue(student.getId());
                row.createCell(1).setCellValue(student.getName());
                row.createCell(2).setCellValue(student.getClassName());
                row.createCell(3).setCellValue(student.getVaccinationDate().toString());
            }

            // Write the workbook to the output stream
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (Exception e) {
            throw new RuntimeException("Error generating vaccination report", e);
        } finally {
            try {
                workbook.close();
                out.close();
            } catch (IOException e) {
                throw new RuntimeException("Error closing resources", e);
            }
        }
    }

    @Override
    @Transactional
    public String bulkUploadStudents(MultipartFile file) {
        if (file.isEmpty()) {
            return "The uploaded file is empty. Please upload a valid Excel file.";
        }

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0); // Assuming data is in the first sheet
            for (int i = 1; i <= sheet.getLastRowNum(); i++) { // Skip header row
                Row row = sheet.getRow(i);
                if (row == null) continue;

                // Extract data from each row
                String name = row.getCell(0).getStringCellValue();
                String className = row.getCell(1).getStringCellValue();
                boolean vaccinationStatus = row.getCell(2).getBooleanCellValue();

                // Map to Student entity
                Student student = new Student();
                student.setName(name);
                student.setClassName(className);
                student.setVaccinationStatus(vaccinationStatus);

                // Save to database
                studentRepository.save(student);
            }
            return "Bulk upload successful. All students have been saved.";
        } catch (Exception e) {
            throw new RuntimeException("Error processing the Excel file: " + e.getMessage(), e);
        }
    }

    @Override
    public StudentDto generateRandomStudentData() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://randomuser.me/api/";
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
        Map<String, Object> user = results.get(0);
        Map<String, String> name = (Map<String, String>) user.get("name");
        Student randomStudent = new Student();
        randomStudent.setClassName("Class " + (int) (Math.random() * 10 + 1));
        randomStudent.setName(name.get("first") + " " + name.get("last"));
        randomStudent.setVaccinationStatus(Math.random() > 0.5);
        randomStudent.setVaccinationDate(generateRandomDate());
        randomStudent.setDoseNumber((int) (Math.random() * 3 + 1));
        randomStudent.setGender((String) user.get("gender"));

        // Save the generated student to the database
        Student savedStudent = studentRepository.save(randomStudent);


// Convert the saved student entity to DTO
        StudentDto studentDto = new StudentDto();
        studentDto.setId(savedStudent.getId());
        studentDto.setClassName(savedStudent.getClassName());
        studentDto.setName(savedStudent.getName());
        studentDto.setVaccinationStatus(savedStudent.isVaccinationStatus());

        studentDto.setVaccinationDate(savedStudent.getVaccinationDate());
        studentDto.setDoseNumber(savedStudent.getDoseNumber());
        studentDto.setGender(savedStudent.getGender());

        return studentDto;
    }


    private LocalDate generateRandomDate() {
   LocalDate startDate = LocalDate.of(2020, 1, 1);

        long days = ChronoUnit.DAYS.between(startDate, LocalDate.now());
   return startDate.plusDays(ThreadLocalRandom.current().nextLong(days + 1));
}



    //

}
