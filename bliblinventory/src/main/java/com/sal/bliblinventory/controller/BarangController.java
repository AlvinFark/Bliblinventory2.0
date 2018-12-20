package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.service.BarangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BarangController {

    private BarangService barangService;
    @Autowired
    public void setBarangService(BarangService barangService){
        this.barangService = barangService;
    }

    @GetMapping(value = "employee/sortByName")
    public List<Barang> listBarangSortByName(Model md){
        List<Barang> barang = barangService.sortByName();
        return barang;
    }

    @RequestMapping(value = "employee/sortByName/{param1}", method = RequestMethod.GET)
    public List<Barang> listBarangSortByNameAndSeachKeyword(Model md, @PathVariable(value = "param1") String param1){
        List<Barang> barang = barangService.sortByNameAndSeachKeyword(param1);
        return barang;
    }

    @GetMapping(value = "employee/sortByCode")
    public List<Barang> listBarangSortByCode(Model md){
        List<Barang> barang = barangService.sortByCode();
        return barang;
    }

    @RequestMapping(value = "employee/sortByCode/{param1}", method = RequestMethod.GET)
    public List<Barang> listBarangSortByCodeAndSeachKeyword(Model md, @PathVariable(value = "param1") String param1){
        List<Barang> barang = barangService.sortByCodeAndSeachKeyword(param1);
        return barang;
    }

    @RequestMapping(value = "employee/getAllProduct", method = RequestMethod.GET)
    public List<Barang> listBarangAll(Model md){
        List<Barang> barang = barangService.sortByName();
        return barang;
    }

    @RequestMapping(value = "employee/getDetailProduct/{param1}", method = RequestMethod.GET)
    public Barang detailBarang(Model md, @PathVariable(value = "param1") String param1){
        List<Barang> barang = barangService.getDetailBarang(param1);
        return barang.get(0);
    }
}
