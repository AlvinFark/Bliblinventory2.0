package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.Category;
import com.sal.bliblinventory.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;

    //dapatkan semua kategori
    @RequestMapping(value = {"/api/getAllCategory"}, method = RequestMethod.GET)
    public List<Category> getAllCategory(){
        return categoryRepository.findAllByIsExist(true);
    }

    //tambah kategori baru
    @RequestMapping(value = {"/api/addCategory"}, method = RequestMethod.POST)
    public Category addCategory(@Valid @RequestBody Category category) {
      return categoryRepository.save(category);
    }

    //dapatkan detail kategori
    @GetMapping("api/getDetailCategory/{idKategori}")
    public Category getDetailCategory(@PathVariable(value = "idKategori") Long idKategori){
        return categoryRepository.getCategoryById(idKategori);
    }

    //ubah/edit kategori
    @PutMapping("/api/editKategori/{namaKategoriBaru}")
    public Category editKategori(@PathVariable String namaKategoriBaru, @Valid @RequestBody Category categoryRequest) {
        categoryRequest.setName(namaKategoriBaru);
        return categoryRepository.save(categoryRequest);
    }

    //buat kategori
    @RequestMapping(value = "api/createNewCategory/{namaKategoriBaru}", method = RequestMethod.POST)
    public void createNewCategory(@PathVariable(value = "namaKategoriBaru") String namaKategoriBaru){
        Category categoryNew = new Category(namaKategoriBaru);
        categoryRepository.save(categoryNew);
    }

    //hapus kategori
    @PutMapping("/api/hapusKategori")
    public Category hapusKategori(@Valid @RequestBody Category categoryRequest) {
        categoryRequest.setExist(false);
        return categoryRepository.save(categoryRequest);
    }
}
