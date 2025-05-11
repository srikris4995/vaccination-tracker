package com.school.vaccine_tracker.mapper;

import com.school.vaccine_tracker.dto.StudentDto;
import com.school.vaccine_tracker.entity.Student;

import java.time.LocalDate;

public class StudentMapper {
    public static StudentDto mapToStudentDto(Student student) {
        return new StudentDto(
                student.getId(),
                student.getName(),
                student.getClassName(),
                student.isVaccinationStatus(), // Keep as String
                student.getVaccinationDate(),
                student.getGender(),
                student.getDoseNumber()
        );
    }
    public static Student mapToStudent(StudentDto studentDto) {
        return new Student(studentDto.getId(),
                studentDto.getName(),
                studentDto.getClassName(),
                studentDto.isVaccinationStatus(),
                studentDto.getVaccinationDate(),
                studentDto.getDoseNumber(),
                studentDto.getGender()
        );
    };
}



//controller --> service --> repository