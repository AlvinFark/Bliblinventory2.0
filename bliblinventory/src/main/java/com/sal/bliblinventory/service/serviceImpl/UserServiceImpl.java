package com.sal.bliblinventory.service.serviceImpl;

import com.sal.bliblinventory.exception.AppException;
import com.sal.bliblinventory.exception.ResourceNotFoundException;
import com.sal.bliblinventory.model.Gender;
import com.sal.bliblinventory.model.Role;
import com.sal.bliblinventory.model.User;
import com.sal.bliblinventory.payload.SignUpRequest;
import com.sal.bliblinventory.repository.RoleRepository;
import com.sal.bliblinventory.repository.UserRepository;
import com.sal.bliblinventory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Override
  public User getUserByUsername(String username){
    User user = userRepository.getUserByUsername(username);
    if (user!=null) {
      user.setGambar(user.getId() + "." + user.getGambar());
      userRepository.save(user);
    }
    return user;
  }

  @Override
  public User editUser(Long id, SignUpRequest userRequest) {

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
    user.setGambar(user.getId()+"."+user.getGambar());

    return userRepository.findById(id).map(u -> {
      u = user;
      return userRepository.save(u);
    }).orElseThrow(() -> new ResourceNotFoundException("user","id", id));
  }

  @Override
  public List<User> listAllUser(){
    return userRepository.findAllByOrderByName();
  }

  @Override
  public List<User> listSearchUser(String param){
    return userRepository.findAllByNameContainingOrderByName(param);
  }

  @Override
  public User getUserByUsernameOrEmail(String uname){
    return userRepository.getUserByUsernameOrEmailAndIsActive(uname,uname,true);
  }

  @Override
  public User getUserById(Long id){
    return userRepository.getUserById(id);
  }

  @Override
  public String encodePassword(String password){
    return passwordEncoder.encode(password);
  }

}
