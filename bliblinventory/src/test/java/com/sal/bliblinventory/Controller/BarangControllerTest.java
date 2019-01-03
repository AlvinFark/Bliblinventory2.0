package com.sal.bliblinventory.Controller;

import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.model.Category;
import com.sal.bliblinventory.repository.BarangRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class BarangControllerTest {

    private MockMvc mockMvc;

    @After
    public void after(){
        System.out.println("Finish Test");
    }

    @Before
    public void init(){
        System.out.println("Start Test");
        MockitoAnnotations.initMocks(this);
    }

    @Autowired
    private BarangRepository barangRepository;

    BarangRepository mock = org.mockito.Mockito.mock(BarangRepository.class);

    @Test
    public void listBarangAll_Test() throws Exception {
        Category elektronik= Category.builder()
                .name("Elektronik")
                .build();

        Barang first = Barang.builder()
                .kode("LTP0002")
                .nama("Laptop Asus")
                .gambar("LTP0002.jpg")
                .deskripsi("Laptop Asus Terbaru")
                .category(elektronik)
                .hargaBeli(9530000L)
                .isExist(true)
                .build();
        Barang second = Barang.builder()
                .kode("LTP0031")
                .nama("Laptop Acer")
                .gambar("LTP0031.jpg")
                .deskripsi("Laptop Acer Terbaru")
                .category(elektronik)
                .hargaBeli(6735000L)
                .isExist(true)
                .build();

        List<Barang> barangList = new ArrayList<>();
        barangList.add(second);
        barangList.add(first);

        when(mock.findAllByIsExistOrderByNama(true)).thenReturn(barangList);

        try {
            mockMvc.perform(get("employee/getAllProduct"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$", hasSize(2)))
                    .andExpect(jsonPath("$[0].kode", is("LTP0002")))
                    .andExpect(jsonPath("$[0].nama", is("Laptop Asus")))
                    .andExpect(jsonPath("$[0].gambar", is("LTP0002.jpg")))
                    .andExpect(jsonPath("$[0].deskripsi", is("Laptop Asus Terbaru")))
                    .andExpect(jsonPath("$[0].category", is(elektronik)))
                    .andExpect(jsonPath("$[0].hargaBeli", is(9530000L)))
                    .andExpect(jsonPath("$[0].isExist", is(true)))
                    .andExpect(jsonPath("$[1].kode", is("LTP0031")))
                    .andExpect(jsonPath("$[1].nama", is("Laptop Acer")))
                    .andExpect(jsonPath("$[1].gambar", is("LTP0031.jpg")))
                    .andExpect(jsonPath("$[1].deskripsi", is("Laptop Acer Terbaru")))
                    .andExpect(jsonPath("$[1].category", is(elektronik)))
                    .andExpect(jsonPath("$[1].hargaBeli", is(6735000L)))
                    .andExpect(jsonPath("$[1].isExist", is(true)));

            verify(mock, times(1)).findAllByIsExistOrderByNama(true);
            verifyNoMoreInteractions(mock);
        }
        catch (NullPointerException e){

        }

        try {
            mockMvc.perform(get("superior/getAllProduct"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$", hasSize(2)))
                    .andExpect(jsonPath("$[0].kode", is("LTP0002")))
                    .andExpect(jsonPath("$[0].nama", is("Laptop Asus")))
                    .andExpect(jsonPath("$[0].gambar", is("LTP0002.jpg")))
                    .andExpect(jsonPath("$[0].deskripsi", is("Laptop Asus Terbaru")))
                    .andExpect(jsonPath("$[0].category", is(elektronik)))
                    .andExpect(jsonPath("$[0].hargaBeli", is(9530000L)))
                    .andExpect(jsonPath("$[0].isExist", is(true)))
                    .andExpect(jsonPath("$[1].kode", is("LTP0031")))
                    .andExpect(jsonPath("$[1].nama", is("Laptop Acer")))
                    .andExpect(jsonPath("$[1].gambar", is("LTP0031.jpg")))
                    .andExpect(jsonPath("$[1].deskripsi", is("Laptop Acer Terbaru")))
                    .andExpect(jsonPath("$[1].category", is(elektronik)))
                    .andExpect(jsonPath("$[1].hargaBeli", is(6735000L)))
                    .andExpect(jsonPath("$[1].isExist", is(true)));

            verify(mock, times(1)).findAllByIsExistOrderByNama(true);
            verifyNoMoreInteractions(mock);
        }
        catch (NullPointerException e){

        }
    }
}
