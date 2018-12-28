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

    @RequestMapping(value = {"employee/sortByName"}, method = RequestMethod.GET)
    public List<Barang> listBarangSortByName(){
        return barangRepository.findAllByIsExistOrderByNama(true);
    }

    @RequestMapping(value = {"employee/sortByName/{indexKategori}", "superior/sortByName/{indexKategori}"}, method = RequestMethod.GET)
    public List<Barang> listBarangSortByNameAndFilterByCategory(@PathVariable(value = "indexKategori") Long indexKategori){
        if(indexKategori==0)
            return barangRepository.findAllByIsExistOrderByNama(true);
        else
            return barangRepository.findAllByIsExistAndCategory_IdOrderByNama(true, indexKategori);
    }

    @RequestMapping(value = {"employee/sortByCode/{indexKategori}", "superior/sortByCode/{indexKategori}"}, method = RequestMethod.GET)
    public List<Barang> listBarangSortByCodeAndFilterByCategory(@PathVariable(value = "indexKategori") Long indexKategori){
        if(indexKategori==0)
            return barangRepository.findAllByIsExistOrderByKode(true);
        else
            return barangRepository.findAllByIsExistAndCategory_IdOrderByKode(true, indexKategori);
    }

    @RequestMapping(value = {"employee/sortByName/{indexKategori}/{keyword}", "superior/sortByName/{indexKategori}/{keyword}"}, method = RequestMethod.GET)
    public List<Barang> listBarangByKeywordAndSortByNameAndFilterByCategory(@PathVariable(value = "indexKategori") Long indexKategori, @PathVariable(value = "keyword") String keyword){
        if(indexKategori==0)
            return barangRepository.findByNamaContainingAndIsExistOrderByNama(keyword, true);
        else
            return barangRepository.findByNamaContainingAndIsExistAndCategory_IdOrderByNama(keyword, true, indexKategori);
    }

    @RequestMapping(value = {"employee/sortByCode/{indexKategori}/{keyword}", "superior/sortByCode/{indexKategori}/{keyword}"}, method = RequestMethod.GET)
    public List<Barang> listBarangByKeywordAndSortByCodeAndFilterByCategory(@PathVariable(value = "indexKategori") Long indexKategori, @PathVariable(value = "keyword") String keyword){
        if(indexKategori==0)
           return barangRepository.findByNamaContainingAndIsExistOrderByKode(keyword, true);
        else
            return barangRepository.findByNamaContainingAndIsExistAndCategory_IdOrderByKode(keyword, true, indexKategori);
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