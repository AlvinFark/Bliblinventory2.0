package com.sal.bliblinventory.service;

import com.sal.bliblinventory.model.User;
import com.sal.bliblinventory.payload.SignUpRequest;

import java.util.List;

public interface UserService {

  public User editUser(Long id, SignUpRequest userRequest);

  public User getUserByUsername(String username);

  public List<User> listAllUser();

  public List<User> listSearchUser(String param);

  public User getUserByUsernameOrEmail(String uname);

  public User getUserById(Long id);

  public String encodePassword(String password);


}
