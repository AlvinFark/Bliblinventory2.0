package com.sal.bliblinventory.service;

import com.sal.bliblinventory.model.User;
import com.sal.bliblinventory.payload.SignUpRequest;

public interface UserService {

  public User editUser(Long id, SignUpRequest userRequest);

  public User getUserByUsername(String username);


}
