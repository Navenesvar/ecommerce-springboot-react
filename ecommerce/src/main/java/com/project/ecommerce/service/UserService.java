package com.project.ecommerce.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.ecommerce.dto.LoginRequest;
import com.project.ecommerce.dto.LoginResponse;
import com.project.ecommerce.dto.RegisterRequest;
import com.project.ecommerce.entity.User;
import com.project.ecommerce.repository.UserRepository;
import com.project.ecommerce.security.JwtUtil;

@Service
public class UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository repository,
                       BCryptPasswordEncoder encoder,
                    JwtUtil jwtUtil) {
        this.repository = repository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    public User register(RegisterRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Encrypt password before saving
        user.setPassword(
                encoder.encode(request.getPassword()));

        user.setRole("USER");

        return repository.save(user);
    }

    public LoginResponse login(LoginRequest request) {

        User user = repository
                .findByEmail(request.getEmail())
                .orElse(null);

        if(user == null) {
            throw new RuntimeException("User Not Found");
        }

        if(!encoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid Credentials");
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail(),
                        user.getRole());

        return new LoginResponse(token);
    }
}