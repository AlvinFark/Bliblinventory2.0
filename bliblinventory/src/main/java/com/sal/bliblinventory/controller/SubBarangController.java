package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.repository.SubBarangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubBarangController {
    @Autowired
    SubBarangRepository subBarangRepository;

    @RequestMapping(value = "employee/countAllSubBarang/{param1}", method = RequestMethod.GET)
    public int countSubBarang(Model md, @PathVariable(value = "param1") String param1){
        return subBarangRepository.countSubBarangByBarangKode(param1);
    }

    @RequestMapping(value = "employee/countReadySubBarang/{param1}", method = RequestMethod.GET)
    public int countReadySubBarang(Model md, @PathVariable(value = "param1") String param1){
        return subBarangRepository.countSubBarangByBarangKodeAndStatusSubBarang(param1, true);
    }
}
