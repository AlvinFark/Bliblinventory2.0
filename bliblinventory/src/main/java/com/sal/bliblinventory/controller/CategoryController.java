package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.Category;
import com.sal.bliblinventory.repository.CategoryRepository;
import com.sal.bliblinventory.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryService categoryService;

    //dapatkan semua kategori
    @RequestMapping(value = {"/api/getAllCategory"}, method = RequestMethod.GET)
    public List<Category> getAllCategory(){
        return categoryService.getAllCategory();
    }

    //tambah kategori baru
    @RequestMapping(value = {"/api/addCategory"}, method = RequestMethod.POST)
    public Category addCategory(@Valid @RequestBody Category category) {
        return categoryService.addCategory(category);
    }

    //dapatkan detail kategori
    @GetMapping("api/getDetailCategory/{idKategori}")
    public Category getDetailCategory(@PathVariable(value = "idKategori") Long idKategori){
        return categoryService.getDetailCategory(idKategori);
    }

    //ubah/edit kategori
    @PutMapping("/api/editKategori/{namaKategoriBaru}")
    public Category editKategori(@PathVariable String namaKategoriBaru, @Valid @RequestBody Category categoryRequest) {
        return categoryService.editKategori(namaKategoriBaru, categoryRequest);
    }

    //buat kategori
    @RequestMapping(value = "api/createNewCategory/{namaKategoriBaru}", method = RequestMethod.POST)
    public void createNewCategory(@PathVariable(value = "namaKategoriBaru") String namaKategoriBaru){
        categoryService.createNewCategory(namaKategoriBaru);
    }

    //hapus kategori
    @PutMapping("/api/hapusKategori")
    public Category hapusKategori(@Valid @RequestBody Category categoryRequest) {
        return categoryService.hapusKategori(categoryRequest);
    }
}
