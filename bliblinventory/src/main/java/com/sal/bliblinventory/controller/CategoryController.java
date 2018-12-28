package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.Category;
import com.sal.bliblinventory.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;

    @RequestMapping(value = {"employee/getAllCategory", "superior/getAllCategory"}, method = RequestMethod.GET)
    public List<Category> getAllCategory(){
        return categoryRepository.findAll();
    }
}
