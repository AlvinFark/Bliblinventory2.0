package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.exception.AppException;
import com.sal.bliblinventory.model.Gender;
import com.sal.bliblinventory.model.Role;
import com.sal.bliblinventory.model.User;
import com.sal.bliblinventory.payload.SignUpRequest;
import com.sal.bliblinventory.repository.RoleRepository;
import com.sal.bliblinventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@Controller
public class AuthController {

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  UserRepository userRepository;

  @RequestMapping(value={"/", "/loginPage"}, method = RequestMethod.GET)
  public ModelAndView login(Map<String, Object> model) {
        ModelAndView modelAndView = new ModelAndView();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boolean isLoggedIn = auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken);

        System.out.print("----------------------------------" + auth + "----------------------------------");

        System.out.print("----------------------------------" + auth.isAuthenticated() + "----------------------------------");

        if(isLoggedIn){

            Authentication a = SecurityContextHolder.getContext().getAuthentication();
            Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) a.getAuthorities();
            String r = "";
            for (GrantedAuthority authority : authorities) {
                r = authority.getAuthority();
            }
            String role = r;

            if(role.equals("ROLE_ADMIN"))
                return new ModelAndView("redirect:/admin");
            else if(role.equals("ROLE_SUPERIOR"))
                return new ModelAndView("redirect:/superior");
            else if(role.equals("ROLE_EMPLOYEE"))
                return new ModelAndView("redirect:/employee");
        }

        return new ModelAndView("redirect:/loginPage");
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

    User result = userRepository.save(user);

    URI location = ServletUriComponentsBuilder
        .fromCurrentContextPath().path("/api/users/{username}")
        .buildAndExpand(result.getUsername()).toUri();

    return result;
  }

}

