package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.User;
import com.sal.bliblinventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping
  public List<User> getAllUser(){
    return userRepository.getAllUserByNameIsNotNull();
  }

  @GetMapping("/id/{id}")
  public User getUserById(@PathVariable Long id){
    return userRepository.getUserById(id);
  }

  @GetMapping("/name/{name}")
  public List<User> getUserByName(@PathVariable String name){
    return userRepository.getAllUserByName(name);
  }

  @GetMapping("/role/{id}")
  public List<User> getUserByRole(@PathVariable Long id){
    return userRepository.getAllUserByRoles(id);
  }

  @DeleteMapping("/id/{id}")
  public Boolean deleteUser(@PathVariable Long id){
    return userRepository.deleteUserById(id);
  }

}

