package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.Gender;
import com.sal.bliblinventory.security.JwtTokenProvider;
import com.sal.bliblinventory.exception.AppException;
import com.sal.bliblinventory.model.Role;
import com.sal.bliblinventory.model.User;
import com.sal.bliblinventory.payload.ApiResponse;
import com.sal.bliblinventory.payload.JwtAuthenticationResponse;
import com.sal.bliblinventory.payload.LoginRequest;
import com.sal.bliblinventory.payload.SignUpRequest;
import com.sal.bliblinventory.repository.RoleRepository;
import com.sal.bliblinventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  JwtTokenProvider tokenProvider;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginRequest.getUsernameOrEmail(),
            loginRequest.getPassword()
        )
    );

//    if(authentication.isAuthenticated() && authentication.getAuthorities().equals("ADMIN")){
//      return
//    }

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.generateToken(authentication);
    return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
  }

  @PostMapping("/signup")
  public User registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {

    Gender gender = Gender.valueOf(signUpRequest.getGender());

    User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
        signUpRequest.getEmail(), signUpRequest.getPassword(), gender,
        signUpRequest.getAddress(), signUpRequest.getDateOfBirth(), signUpRequest.getPhoneNumber(), signUpRequest.getGambar());

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    Role userRole = roleRepository.findById(signUpRequest.getRoleId())
        .orElseThrow(() -> new AppException("User Role not set."));

    user.setRoles(Collections.singleton(userRole));
    user.setSuperiorId(signUpRequest.getSuperiorId());
    user.setGambar(user.getId()+"."+user.getGambar());

    User result = userRepository.save(user);

    URI location = ServletUriComponentsBuilder
        .fromCurrentContextPath().path("/api/users/{username}")
        .buildAndExpand(result.getUsername()).toUri();

    return user;
  }
}