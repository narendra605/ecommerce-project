package com.springboot.simpleWebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springboot.simpleWebapp.model.User;
import com.springboot.simpleWebapp.service.UserService;

import java.util.HashMap;
import java.util.Map;
@RestController
@CrossOrigin//The request from different orgin 
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.loginWithEmail(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            return ResponseEntity.ok("Login successful ! Welcome ," + user.getName());
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    // DTO for request
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}