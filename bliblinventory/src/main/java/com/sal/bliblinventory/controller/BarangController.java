package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.repository.BarangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BarangController {

    @Autowired
    BarangRepository barangRepository;

    @RequestMapping(value = "employee/getAllProduct", method = RequestMethod.GET)
    public List<Barang> listBarangAll(){
        return barangRepository.findAllByOrderByNama();
    }

    @RequestMapping(value = "employee/sortByName", method = RequestMethod.GET)
    public List<Barang> listBarangSortByName(){
        return barangRepository.findAllByOrderByNama();
    }

    @RequestMapping(value = "employee/sortByCode", method = RequestMethod.GET)
    public List<Barang> listBarangSortByCode(){
        return barangRepository.findAllByOrderByKode();
    }

    @RequestMapping(value = "employee/sortByName/{param1}", method = RequestMethod.GET)
    public List<Barang> listBarangByKeywordAndSortByName(Model md, @PathVariable(value = "param1") String param1){
        return barangRepository.findByNamaContainingOrderByNama(param1);
    }

    @RequestMapping(value = "employee/sortByCode/{param1}", method = RequestMethod.GET)
    public List<Barang> listBarangByKeywordAndSortByCode(Model md, @PathVariable(value = "param1") String param1){
        return barangRepository.findByNamaContainingOrderByKode(param1);
    }

    @RequestMapping(value = "employee/getDetailProduct/{param1}", method = RequestMethod.GET)
    public Barang getDetailBarang(Model md, @PathVariable(value = "param1") String param1){
        //tambah hitung sub barang juga
        return barangRepository.findBarangByKode(param1);
    }

}
