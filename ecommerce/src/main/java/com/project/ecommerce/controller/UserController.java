package com.project.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.ecommerce.dto.LoginRequest;
import com.project.ecommerce.dto.LoginResponse;
import com.project.ecommerce.dto.RegisterRequest;
import com.project.ecommerce.entity.User;
import com.project.ecommerce.service.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;
@GetMapping("/whoami")
public Object whoAmI(Authentication authentication) {
    return authentication;
}
    @PostMapping("/register")
    public User register(
        @RequestBody RegisterRequest request){

        return service.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
        @RequestBody LoginRequest request) {

        return service.login(request);
    }
}
