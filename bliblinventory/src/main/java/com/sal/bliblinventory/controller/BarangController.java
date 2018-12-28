package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.exception.ResourceNotFoundException;
import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.model.Category;
import com.sal.bliblinventory.repository.BarangRepository;
import com.sal.bliblinventory.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;

@RestController
public class BarangController {

    @Autowired
    BarangRepository barangRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @RequestMapping(value = {"employee/getAllProduct", "superior/getAllProduct"}, method = RequestMethod.GET)
    public List<Barang> listBarangAll(){
        return barangRepository.findAllByOrderByNama();
    }

    @RequestMapping(value = {"employee/sortByName", "superior/sortByName"}, method = RequestMethod.GET)
    public List<Barang> listBarangSortByName(){
        return barangRepository.findAllByOrderByNama();
    }

    @RequestMapping(value = {"employee/sortByCode", "superior/sortByCode"}, method = RequestMethod.GET)
    public List<Barang> listBarangSortByCode(){
        return barangRepository.findAllByOrderByKode();
    }

    @RequestMapping(value = {"employee/sortByName/{param1}", "superior/sortByName/{param1}"}, method = RequestMethod.GET)
    public List<Barang> listBarangByKeywordAndSortByName(Model md, @PathVariable(value = "param1") String param1){
        return barangRepository.findByNamaContainingOrderByNama(param1);
    }

    @RequestMapping(value = {"employee/sortByCode/{param1}", "superior/sortByCode/{param1}"}, method = RequestMethod.GET)
    public List<Barang> listBarangByKeywordAndSortByCode(Model md, @PathVariable(value = "param1") String param1){
        return barangRepository.findByNamaContainingOrderByKode(param1);
    }

    @RequestMapping(value = {"employee/getDetailProduct/{param1}", "superior/getDetailProduct/{param1}"}, method = RequestMethod.GET)
    public Barang getDetailBarang(Model md, @PathVariable(value = "param1") String param1){
        return barangRepository.findBarangByKode(param1);
    }

  @PutMapping("/api/barang/{categoryName}")
  public Barang editBarang(@PathVariable String categoryName, @Valid @RequestBody Barang barangRequest) {

    Category category = categoryRepository.findByName(categoryName);
    barangRequest.setCategory(category);
    return barangRepository.save(barangRequest);
  }

}