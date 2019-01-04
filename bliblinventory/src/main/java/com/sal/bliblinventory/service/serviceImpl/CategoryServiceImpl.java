package com.sal.bliblinventory.service.serviceImpl;

import com.sal.bliblinventory.model.Category;
import com.sal.bliblinventory.repository.CategoryRepository;
import com.sal.bliblinventory.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategory() {
        return categoryRepository.findAllByIsExist(true);
    }

    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category getDetailCategory(Long idKategori) {
        return categoryRepository.getCategoryById(idKategori);
    }

    @Override
    public Category editKategori(String namaKategoriBaru, Category categoryRequest) {
        categoryRequest.setName(namaKategoriBaru);
        return categoryRepository.save(categoryRequest);
    }

    @Override
    public void createNewCategory(String namaKategoriBaru) {
        Category categoryNew = new Category(namaKategoriBaru);
        categoryRepository.save(categoryNew);
    }

    @Override
    public Category hapusKategori(Category categoryRequest) {
        categoryRequest.setExist(false);
        return categoryRepository.save(categoryRequest);
    }
}
