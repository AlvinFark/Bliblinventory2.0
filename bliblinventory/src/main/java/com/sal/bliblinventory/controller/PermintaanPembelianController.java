package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.repository.PermintaanPembelianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PermintaanPembelianController {
    @Autowired
    PermintaanPembelianRepository permintaanPembelianRepository;
}
