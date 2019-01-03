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

    @RequestMapping(value = {"employee/getAllCategory", "superior/getAllCategory", "admin/getAllCategory"}, method = RequestMethod.GET)
    public List<Category> getAllCategory(){
        return categoryRepository.findAllByIsExist(true);
    }

    @GetMapping("/category")
    public List<Category> listAllCategory(){
      return categoryRepository.findAllByIsExist(true);
    }

    @RequestMapping(value = {"/api/category"}, method = RequestMethod.POST)
    public Category addCategory(@Valid @RequestBody Category category) {
      return categoryRepository.save(category);
    }

    @GetMapping("api/getDetailCategory/{idKategori}")
    public Category getDetailCategory(@PathVariable(value = "idKategori") Long idKategori){
        return categoryRepository.getCategoryById(idKategori);
    }

    @PutMapping("/api/editKategori/{namaKategoriBaru}")
    public Category editKategori(@PathVariable String namaKategoriBaru, @Valid @RequestBody Category categoryRequest) {
        categoryRequest.setName(namaKategoriBaru);
        return categoryRepository.save(categoryRequest);
    }

    @RequestMapping(value = "api/createNewCategory/{namaKategoriBaru}", method = RequestMethod.POST)
    public void createNewCategory(@PathVariable(value = "namaKategoriBaru") String namaKategoriBaru){
        Category categoryNew = new Category(namaKategoriBaru);
        categoryRepository.save(categoryNew);
    }
}
