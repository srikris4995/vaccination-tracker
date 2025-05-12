package com.school.vaccine_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.school.vaccine_tracker.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User save(User user);
}
