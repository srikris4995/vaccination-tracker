package com.school.vaccine_tracker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student")
public class Student{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "class_name")
    private String className;
    @Column(name = "name")
    private String name;
    @Column(name = "vaccination_status")
    private boolean vaccinationStatus;
    @Column(name = "vaccination_date")
    private LocalDate vaccinationDate;
    @Column(name = "dose_number")
    private Integer doseNumber;
    private String gender;
}
