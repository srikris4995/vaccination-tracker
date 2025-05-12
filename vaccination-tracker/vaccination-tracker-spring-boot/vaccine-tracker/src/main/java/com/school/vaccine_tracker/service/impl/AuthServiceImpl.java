package com.school.vaccine_tracker.service.impl;

import com.school.vaccine_tracker.dto.AuthRequest;
import com.school.vaccine_tracker.dto.AuthResponse;
import com.school.vaccine_tracker.service.AuthService;
import com.school.vaccine_tracker.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Override
    public AuthResponse login(AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            String token = jwtUtil.generateToken(authRequest.getUsername());
            return new AuthResponse(token);
        }catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username or password", e);
        }
    }
}
