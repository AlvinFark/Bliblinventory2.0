package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.exception.AppException;
import com.sal.bliblinventory.exception.ResourceNotFoundException;
import com.sal.bliblinventory.model.Gender;
import com.sal.bliblinventory.model.Role;
import com.sal.bliblinventory.model.User;
import com.sal.bliblinventory.payload.SignUpRequest;
import com.sal.bliblinventory.repository.RoleRepository;
import com.sal.bliblinventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @GetMapping
  public List<User> listAllUser(){
    return userRepository.findAllByOrderByName();
  }

  @GetMapping("/{param}")
  public List<User> listSearchUser(@PathVariable String param){
    return userRepository.findAllByNameContainingOrderByName(param);
  }

  @GetMapping("/id/{id}")
  public User getUserById(@PathVariable Long id){
    return userRepository.getUserById(id);
  }

  @PutMapping("/id/{id}")
  public User editUser(@PathVariable Long id, @Valid @RequestBody SignUpRequest userRequest) {

    Gender gender = Gender.valueOf(userRequest.getGender());

    User user = new User(userRequest.getName(), userRequest.getUsername(),
        userRequest.getEmail(), userRequest.getPassword(), gender,
        userRequest.getAddress(), userRequest.getDateOfBirth(), userRequest.getPhoneNumber(), userRequest.getGambar());

    Role userRole = roleRepository.findById(userRequest.getRoleId())
        .orElseThrow(() -> new AppException("User Role not set."));

    user.setRoles(Collections.singleton(userRole));
    user.setSuperiorId(userRequest.getSuperiorId());
    user.setId(id);
    user.setIsActive(userRequest.getIsActive());
    if (userRequest.getPasswordBaru()==true){
      user.setPassword(passwordEncoder.encode(user.getPassword()));
    } else {
      User user1 = userRepository.getUserById(id);
      user.setPassword(user1.getPassword());
    }

    return userRepository.findById(id).map(u -> {
      u = user;
      return userRepository.save(u);
    }).orElseThrow(() -> new ResourceNotFoundException("user","id", id));
  }


}

