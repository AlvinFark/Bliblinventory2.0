package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.repository.TransaksiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TransaksiController {
    @Autowired
    TransaksiRepository transaksiRepository;
}
