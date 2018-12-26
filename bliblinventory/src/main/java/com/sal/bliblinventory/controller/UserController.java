package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.exception.AppException;
import com.sal.bliblinventory.exception.ResourceNotFoundException;
import com.sal.bliblinventory.model.Role;
import com.sal.bliblinventory.model.RoleName;
import com.sal.bliblinventory.model.User;
import com.sal.bliblinventory.payload.SignUpRequest;
import com.sal.bliblinventory.repository.RoleRepository;
import com.sal.bliblinventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  UserRepository userRepository;

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

    User user = new User(userRequest.getName(), userRequest.getUsername(),
        userRequest.getEmail(), userRequest.getPassword(), userRequest.getGender(),
        userRequest.getAddress(), userRequest.getDateOfBirth(), userRequest.getPhoneNumber());

    Role userRole = roleRepository.findById(userRequest.getRoleId())
        .orElseThrow(() -> new AppException("User Role not set."));
    User superior = userRepository.getUserById(userRequest.getSuperiorId());

    user.setRoles(Collections.singleton(userRole));
    user.setSuperior(superior);
    user.setId(id);

    return userRepository.findById(id).map(u -> {
      u = user;
      return userRepository.save(u);
    }).orElseThrow(() -> new ResourceNotFoundException("user","id", id));
  }


}

