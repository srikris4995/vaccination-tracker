package com.school.vaccine_tracker.service.impl;

import com.school.vaccine_tracker.dto.AuthRequest;
import com.school.vaccine_tracker.dto.AuthResponse;
import com.school.vaccine_tracker.dto.RegisterRequest;
import com.school.vaccine_tracker.entity.User;
import com.school.vaccine_tracker.repository.UserRepository;
import com.school.vaccine_tracker.service.AuthService;
import com.school.vaccine_tracker.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse login(AuthRequest authRequest) {
        try {
            System.out.println("Authenticating user: " + authRequest.getUsername());
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            String username = authentication.getName();
            String token = jwtUtil.generateToken(username);
            return new AuthResponse(token);
        }catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username or password", e);
        }
    }

    @Override
    public String register(RegisterRequest registerRequest) {
        if(userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username is already in use");
        }
        if(userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }
        //encode the password
        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        //create a new user
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(encodedPassword);
        user.setRole(registerRequest.getRole());
        userRepository.save(user);
        //generate a token
        return "User registered successfully";
    }
}
