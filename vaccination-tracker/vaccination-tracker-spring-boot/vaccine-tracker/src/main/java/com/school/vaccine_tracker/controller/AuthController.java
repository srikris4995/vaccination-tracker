package com.school.vaccine_tracker.controller;


import com.school.vaccine_tracker.dto.AuthRequest;
import com.school.vaccine_tracker.dto.AuthResponse;
import com.school.vaccine_tracker.dto.RegisterRequest;
import com.school.vaccine_tracker.service.AuthService;
import com.school.vaccine_tracker.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<AuthResponse>login(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.login(authRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<String > register(@RequestBody RegisterRequest registerRequest) {

        return ResponseEntity.ok(authService.register(registerRequest));
    }
}
