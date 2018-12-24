package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.repository.DetailTransaksiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DetailTransaksiController {
    @Autowired
    DetailTransaksiRepository detailTransaksiRepository;
}
