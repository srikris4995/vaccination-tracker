package com.school.vaccine_tracker.repository;

import com.school.vaccine_tracker.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long > {

    Long countByVaccinationStatus(boolean vaccinationStatus);
}
