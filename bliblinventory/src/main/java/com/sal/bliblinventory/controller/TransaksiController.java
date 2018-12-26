package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.StatusTransaksi;
import com.sal.bliblinventory.model.Transaksi;
import com.sal.bliblinventory.repository.BarangRepository;
import com.sal.bliblinventory.repository.TransaksiRepository;
import com.sal.bliblinventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TransaksiController {
    @Autowired
    TransaksiRepository transaksiRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BarangRepository barangRepository;

    @RequestMapping(value = {"employee/requestPinjam/{kodeBarang}/{tgPinjam}/{jumlahBarang}/{keteranganPinjam}"}, method = RequestMethod.POST)
    public String sendRequestFromEmployee(Model md, @PathVariable(value = "kodeBarang") String kodeBarang, @PathVariable(value = "tgPinjam") String tgPinjam, @PathVariable(value = "jumlahBarang") int jumlahBarang, @PathVariable(value = "keteranganPinjam") String keteranganPinjam){
        //sementara usernya masih static (pakai user dg id 1L)
        Transaksi transaksi = new Transaksi(userRepository.getUserById(1L), tgPinjam, barangRepository.findBarangByKode(kodeBarang), jumlahBarang, keteranganPinjam, StatusTransaksi.menunggu);
        transaksiRepository.save(transaksi);
        return "Permintaan peminjaman "+barangRepository.findBarangByKode(kodeBarang).getNama()+" sejumlah "+ jumlahBarang+ " unit berhasil";
    }

    @RequestMapping(value = {"superior/requestPinjam/{kodeBarang}/{tgPinjam}/{jumlahBarang}/{keteranganPinjam}"}, method = RequestMethod.POST)
    public String sendRequestFromSuperior(Model md, @PathVariable(value = "kodeBarang") String kodeBarang, @PathVariable(value = "tgPinjam") String tgPinjam, @PathVariable(value = "jumlahBarang") int jumlahBarang, @PathVariable(value = "keteranganPinjam") String keteranganPinjam){
        //sementara usernya masih static (pakai user dg id 1L)
        Transaksi transaksi = new Transaksi(userRepository.getUserById(1L), tgPinjam, barangRepository.findBarangByKode(kodeBarang), jumlahBarang, keteranganPinjam, StatusTransaksi.disetujui);
        transaksiRepository.save(transaksi);
        return "Permintaan peminjaman "+barangRepository.findBarangByKode(kodeBarang).getNama()+" sejumlah "+ jumlahBarang+ " unit berhasil";
    }
}
