package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.exception.ResourceNotFoundException;
import com.sal.bliblinventory.model.SubBarang;
import com.sal.bliblinventory.repository.SubBarangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class SubBarangController {
    @Autowired
    SubBarangRepository subBarangRepository;

    @RequestMapping(value = {"employee/countAllSubBarang/{kodeBarang}", "superior/countAllSubBarang/{kodeBarang}"}, method = RequestMethod.GET)
    public int countSubBarang(@PathVariable(value = "kodeBarang") String kodeBarang){
        return subBarangRepository.countSubBarangByBarangKodeAndIsExist(kodeBarang, true);
    }

    @RequestMapping(value = {"employee/countReadySubBarang/{kodeBarang}", "superior/countReadySubBarang/{kodeBarang}"}, method = RequestMethod.GET)
    public int countReadySubBarang(@PathVariable(value = "kodeBarang") String kodeBarang){
        return subBarangRepository.countSubBarangByBarangKodeAndStatusSubBarangAndIsExist(kodeBarang, true, true);
    }

    @RequestMapping(value = {"superior/changeStateSubBarangToBorrowed/{kodeSubBarang}"}, method = RequestMethod.PUT)
    public int changeStateSubBarangToBorrowed(@PathVariable(value = "kodeSubBarang") String kodeSubBarang){
        SubBarang subBarangToUpdate = subBarangRepository.getOne(kodeSubBarang);
        subBarangToUpdate.setStatusSubBarang(false);
        subBarangRepository.save(subBarangToUpdate);
        return 1;
    }
}
