package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.service.BarangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BarangController {

    private BarangService barangService;
    @Autowired
    public void setBarangService(BarangService barangService){
        this.barangService = barangService;
    }

    @GetMapping(value = "employee/sortByName")
    public List<Barang> listBarang(Model md){
        List<Barang> barang = barangService.sortByName();
        return barang;
    }

    @GetMapping(value = "employee/sortByCode")
    public List<Barang> listBarangByCode(Model md){
        List<Barang> barang = barangService.sortByCode();
        return barang;
    }

    @RequestMapping(value = "employee/getAllProduct", method = RequestMethod.GET)
    public List<Barang> listBarangAll(Model md){
        List<Barang> barang = barangService.sortByCode();
        return barang;
    }
    /*
    public String listBarangEmployee(Model md){
        md.addAttribute("barang", barangService.findAll());

        return "daftarBarangCard";
    }*/
}
