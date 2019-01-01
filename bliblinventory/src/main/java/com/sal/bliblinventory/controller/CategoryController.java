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
        return categoryRepository.findAll();
    }

    @GetMapping("/category")
    public List<Category> listAllCategory(){
      return categoryRepository.findAll();
    }

    @RequestMapping(value = {"/api/category"}, method = RequestMethod.POST)
    public Category addCategory(@Valid @RequestBody Category category) {
      return categoryRepository.save(category);
    }
}
