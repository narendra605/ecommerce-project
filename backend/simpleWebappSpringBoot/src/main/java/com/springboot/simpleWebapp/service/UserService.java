package com.springboot.simpleWebapp.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.simpleWebapp.model.User;
import com.springboot.simpleWebapp.repository.UserRespository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRespository userRepository;

    public User loginWithEmail(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}

