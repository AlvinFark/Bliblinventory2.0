package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.User;
import com.sal.bliblinventory.payload.SignUpRequest;
import com.sal.bliblinventory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  UserService userService;

  @GetMapping
  public List<User> listAllUser(){
    return userService.listAllUser();
  }

  @GetMapping("/{param}")
  public List<User> listSearchUser(@PathVariable String param){
    return userService.listSearchUser(param);
  }

  @GetMapping("/username/{uname}")
  public User getUserByUsernameOrEmail(@PathVariable String uname){
    return userService.getUserByUsernameOrEmail(uname);
  }

  @GetMapping("/id/{id}")
  public User getUserById(@PathVariable Long id){
    return userService.getUserById(id);
  }

  @PutMapping("/usernameforgambar/{username}")
  public User getUserByUsername(@PathVariable String username){
    return userService.getUserByUsername(username);
  }

  @PutMapping("/id/{id}")
  public User editUser(@PathVariable Long id, @Valid @RequestBody SignUpRequest userRequest) {
    return userService.editUser(id,userRequest);
  }

  @GetMapping("/password/{password}")
  public String encodePassword(@PathVariable String password){
    return userService.encodePassword(password);
  }

}

