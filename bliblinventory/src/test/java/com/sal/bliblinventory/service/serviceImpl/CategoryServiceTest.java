package com.sal.bliblinventory.service.serviceImpl;

import com.sal.bliblinventory.model.Category;
import com.sal.bliblinventory.repository.CategoryRepository;
import com.sal.bliblinventory.service.CategoryService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = CategoryService.class)
public class CategoryServiceTest {
    @MockBean
    CategoryRepository categoryRepository;

    @InjectMocks
    CategoryServiceImpl categoryServiceImpl;

    @Before
    public void init(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getAllCategory_Test() {
        Category cat1= Category.builder()
                .name("Elektronik")
                .isExist(true)
                .build();
        Category cat2= Category.builder()
                .name("Alat tulis")
                .isExist(true)
                .build();

        List<Category> categoryList = new ArrayList<>();
        categoryList.add(cat1);
        categoryList.add(cat2);

        when(categoryRepository.findAllByIsExist(true)).thenReturn(categoryList);
        categoryServiceImpl.getAllCategory();
    }

    @Test
    public void addCategory_Test() {
        Category cat1= Category.builder()
                .name("Elektronik")
                .isExist(true)
                .build();

        when(categoryRepository.save(cat1)).thenReturn(cat1);
        categoryServiceImpl.addCategory(cat1);
    }

    @Test
    public void getDetailCategory_Test() {
        Category cat1= Category.builder()
                .id(1L)
                .name("Elektronik")
                .isExist(true)
                .build();

        when(categoryRepository.getCategoryById(1L)).thenReturn(cat1);
        categoryServiceImpl.getDetailCategory(1L);
    }
}
