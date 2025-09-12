 package com.springboot.simpleWebapp.repository;	
 import org.springframework.data.jpa.repository.JpaRepository;
 import org.springframework.stereotype.Repository;
 import com.springboot.simpleWebapp.model.User;

 @Repository
 public interface UserRespository extends JpaRepository<User, Integer> {
     User findByEmailAndPassword(String email, String password);
 }

