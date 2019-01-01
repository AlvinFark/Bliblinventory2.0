package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.exception.ResourceNotFoundException;
import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.model.Category;
import com.sal.bliblinventory.repository.BarangRepository;
import com.sal.bliblinventory.repository.CategoryRepository;
import com.sal.bliblinventory.repository.SubBarangRepository;
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
    SubBarangRepository subBarangRepository;

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

    @RequestMapping(value = {"employee/sortByName/{idKategori}", "superior/sortByName/{idKategori}"}, method = RequestMethod.GET)
    public List<Barang> listBarangSortByNameAndFilterByCategory(@PathVariable(value = "idKategori") Long idKategori){
        if(idKategori==0)
            return barangRepository.findAllByIsExistOrderByNama(true);
        else
            return barangRepository.findAllByIsExistAndCategory_IdOrderByNama(true, idKategori);
    }

    @RequestMapping(value = {"employee/sortByCode/{idKategori}", "superior/sortByCode/{idKategori}"}, method = RequestMethod.GET)
    public List<Barang> listBarangSortByCodeAndFilterByCategory(@PathVariable(value = "idKategori") Long idKategori){
        if(idKategori==0)
            return barangRepository.findAllByIsExistOrderByKode(true);
        else
            return barangRepository.findAllByIsExistAndCategory_IdOrderByKode(true, idKategori);
    }

    @RequestMapping(value = {"employee/sortByName/{idKategori}/{keyword}", "superior/sortByName/{idKategori}/{keyword}"}, method = RequestMethod.GET)
    public List<Barang> listBarangByKeywordAndSortByNameAndFilterByCategory(@PathVariable(value = "idKategori") Long idKategori, @PathVariable(value = "keyword") String keyword){
        if(idKategori==0)
            return barangRepository.findByNamaContainingAndIsExistOrderByNama(keyword, true);
        else
            return barangRepository.findByNamaContainingAndIsExistAndCategory_IdOrderByNama(keyword, true, idKategori);
    }

    @RequestMapping(value = {"employee/sortByCode/{idKategori}/{keyword}", "superior/sortByCode/{idKategori}/{keyword}"}, method = RequestMethod.GET)
    public List<Barang> listBarangByKeywordAndSortByCodeAndFilterByCategory(@PathVariable(value = "idKategori") Long idKategori, @PathVariable(value = "keyword") String keyword){
        if(idKategori==0)
           return barangRepository.findByNamaContainingAndIsExistOrderByKode(keyword, true);
        else
            return barangRepository.findByNamaContainingAndIsExistAndCategory_IdOrderByKode(keyword, true, idKategori);
    }

    @RequestMapping(value = {"employee/getDetailProduct/{param1}", "superior/getDetailProduct/{param1}"}, method = RequestMethod.GET)
    public Barang getDetailBarang(@PathVariable(value = "param1") String param1){
        return barangRepository.findBarangByKode(param1);
    }

  @PutMapping("/api/barang/{categoryName}")
  public Barang editBarang(@PathVariable String categoryName, @Valid @RequestBody Barang barangRequest) {

    Category category = categoryRepository.findByName(categoryName);
    barangRequest.setCategory(category);
    return barangRepository.save(barangRequest);
  }

  @PutMapping("/api/barang/delete/{kodeBarang}")
  public String hapusBarang(@PathVariable String kodeBarang) {
      Barang barang = barangRepository.findBarangByKode(kodeBarang);
      int count = subBarangRepository.countSubBarangByBarangKodeAndIsExist(barang.getKode(), true);
      if (count==0){
        barang.setIsExist(false);
        barangRepository.save(barang);
        return "Barang " + barang.getNama() + " berhasil dihapus";
      } else {
        return "Barang" + barang.getNama() + " tidak berhasil dihapus sepenuhnya, terdapat sub barang yang masih dipinjam";
      }
  }

}