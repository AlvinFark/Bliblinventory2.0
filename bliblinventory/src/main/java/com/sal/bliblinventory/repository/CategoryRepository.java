package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    List<Category> findAllByIsExist(boolean isExist);

    Category findByNameAndIsExist(String categoryName, boolean isExist);
    Category getCategoryById(Long idCategory);
}
