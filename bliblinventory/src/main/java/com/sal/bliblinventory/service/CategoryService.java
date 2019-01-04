package com.sal.bliblinventory.service;


import com.sal.bliblinventory.model.Category;

import java.util.List;

public interface CategoryService {
    public abstract List<Category> getAllCategory();
    public abstract Category addCategory(Category category);
    public abstract Category getDetailCategory(Long idKategori);
    public abstract Category editKategori(String namaKategoriBaru, Category categoryRequest);
    public abstract void createNewCategory(String namaKategoriBaru);
    public abstract Category hapusKategori(Category categoryRequest);

}
