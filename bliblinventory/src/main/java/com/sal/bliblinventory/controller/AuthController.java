package com.sal.bliblinventory.controller;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Collection;
import java.util.Map;

@Controller
public class AuthController {

    @RequestMapping(value={"/", "/login"}, method = RequestMethod.GET)
    public ModelAndView loginPage(Map<String, Object> model) {
        ModelAndView modelAndView = new ModelAndView();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boolean isLoggedIn = auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken);

        if(isLoggedIn){

            Authentication a = SecurityContextHolder.getContext().getAuthentication();
            Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) a.getAuthorities();
            String r = "EMPLOYEE";
            for (GrantedAuthority authority : authorities) {
                r = authority.getAuthority();
            }
            String role = r;

            if(role.equals("ADMIN"))
                return new ModelAndView("redirect:/admin");
            if(role.equals("SUPERIOR"))
                return new ModelAndView("redirect:/superior");
            return new ModelAndView("redirect:/employee");
        }

        modelAndView.setViewName("loginPage");
        return modelAndView;
    }



}

