    package com.school.vaccine_tracker.dto;

    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    import java.time.LocalDate;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class StudentDto {
        private Long id;
        private String name;
        private String className;
        private boolean vaccinationStatus;
        private LocalDate vaccinationDate;
        private String gender;
        private Integer doseNumber;
    }
