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
        return barangRepository.findAllByIsExistOrderByNama(true);
    }

    @RequestMapping(value = {"employee/sortByName", "superior/sortByName"}, method = RequestMethod.GET)
    public List<Barang> listBarangSortByName(){
        return barangRepository.findAllByIsExistOrderByNama(true);
    }

    @RequestMapping(value = {"employee/sortByCode", "superior/sortByCode"}, method = RequestMethod.GET)
    public List<Barang> listBarangSortByCode(){
        return barangRepository.findAllByIsExistOrderByKode(true);
    }

    @RequestMapping(value = {"employee/sortByName/{keyword}", "superior/sortByName/{keyword}"}, method = RequestMethod.GET)
    public List<Barang> listBarangByKeywordAndSortByName(@PathVariable(value = "keyword") String keyword){
        return barangRepository.findByNamaContainingAndIsExistOrderByNama(keyword, true);
    }

    @RequestMapping(value = {"employee/sortByCode/{keyword}", "superior/sortByCode/{keyword}"}, method = RequestMethod.GET)
    public List<Barang> listBarangByKeywordAndSortByCode(Model md, @PathVariable(value = "keyword") String keyword){
        return barangRepository.findByNamaContainingAndIsExistOrderByKode(keyword, true);
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