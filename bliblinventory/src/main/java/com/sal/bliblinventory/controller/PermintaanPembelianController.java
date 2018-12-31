package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.PermintaanPembelian;
import com.sal.bliblinventory.repository.CategoryRepository;
import com.sal.bliblinventory.repository.PermintaanPembelianRepository;
import com.sal.bliblinventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PermintaanPembelianController {
    @Autowired
    PermintaanPembelianRepository permintaanPembelianRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @RequestMapping(value = "api/createPermintaanPembelian/{namaBarang}/{idKategori}/{jumlah}/{keterangan}", method = RequestMethod.POST)
    public PermintaanPembelian createPermintaanPembelian(@PathVariable(value = "namaBarang") String namaBarang, @PathVariable(value = "idKategori") Long idKategori, @PathVariable(value = "jumlah") int jumlah, @PathVariable(value = "keterangan") String keterangan){
        //sementara usernya masih static (pakai user dg id 1L)
        PermintaanPembelian permintaanPembelian = new PermintaanPembelian(namaBarang, categoryRepository.getCategoryById(idKategori), jumlah, keterangan, userRepository.getUserById(1L));
        return permintaanPembelianRepository.save(permintaanPembelian);
    }
}
