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
        List<Barang> listBarang = barangService.sortByName();
        return listBarang;
    }

    @RequestMapping(value = "employee/sortByName/{param1}", method = RequestMethod.GET)
    public List<Barang> listBarangSortByNameAndSeachKeyword(Model md, @PathVariable(value = "param1") String param1){
        List<Barang> listBarang = barangService.sortByNameAndSeachKeyword(param1);
        return listBarang;
    }

    @GetMapping(value = "employee/sortByCode")
    public List<Barang> listBarangSortByCode(Model md){
        List<Barang> listBarang = barangService.sortByCode();
        return listBarang;
    }

    @RequestMapping(value = "employee/sortByCode/{param1}", method = RequestMethod.GET)
    public List<Barang> listBarangSortByCodeAndSeachKeyword(Model md, @PathVariable(value = "param1") String param1){
        List<Barang> listBarang = barangService.sortByCodeAndSeachKeyword(param1);
        return listBarang;
    }

    @RequestMapping(value = "employee/getAllProduct", method = RequestMethod.GET)
    public List<Barang> listBarangAll(Model md){
        List<Barang> listBarang = barangService.sortByName();
        return listBarang;
    }

    @RequestMapping(value = "employee/getDetailProduct/{param1}", method = RequestMethod.GET)
    public Barang detailBarang(Model md, @PathVariable(value = "param1") String param1){
        List<Barang> listBarang = barangService.getDetailBarang(param1);
        Barang barang = listBarang.get(0);
        List<Barang> listBarang1 = barangService.getJumlahSubBarang(barang, param1);
        return listBarang1.get(0);
    }
}
