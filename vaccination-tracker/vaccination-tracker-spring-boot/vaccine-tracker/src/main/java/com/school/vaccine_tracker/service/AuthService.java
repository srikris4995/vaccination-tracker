package com.school.vaccine_tracker.service;

import com.school.vaccine_tracker.dto.AuthRequest;
import com.school.vaccine_tracker.dto.AuthResponse;
import com.school.vaccine_tracker.dto.RegisterRequest;

public interface AuthService {
    AuthResponse login(AuthRequest authRequest);
    String register(RegisterRequest registerRequest);
}
