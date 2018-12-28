package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.DetailTransaksi;
import com.sal.bliblinventory.model.StatusTransaksi;
import com.sal.bliblinventory.model.SubBarang;
import com.sal.bliblinventory.model.Transaksi;
import com.sal.bliblinventory.repository.*;
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

    @Autowired
    DetailTransaksiRepository detailTransaksiRepository;

    @Autowired
    SubBarangRepository subBarangRepository;

    //employee mengirim request pinjam
    @RequestMapping(value = {"employee/requestPinjam/{kodeBarang}/{tgPinjam}/{jumlahBarang}/{keteranganPinjam}"}, method = RequestMethod.POST)
    public String sendRequestFromEmployee(@PathVariable(value = "kodeBarang") String kodeBarang, @PathVariable(value = "tgPinjam") String tgPinjam, @PathVariable(value = "jumlahBarang") int jumlahBarang, @PathVariable(value = "keteranganPinjam") String keteranganPinjam){
        //sementara usernya masih static (pakai user dg id 1L)
        Transaksi transaksi = new Transaksi(userRepository.getUserById(1L), tgPinjam, barangRepository.findBarangByKode(kodeBarang), jumlahBarang, keteranganPinjam, StatusTransaksi.menunggu);
        transaksiRepository.save(transaksi);
        return "Permintaan peminjaman "+barangRepository.findBarangByKode(kodeBarang).getNama()+" sejumlah "+ jumlahBarang+ " unit berhasil";
    }

    //superior mengirim request pinjam
    @RequestMapping(value = {"superior/requestPinjam/{kodeBarang}/{tgPinjam}/{jumlahBarang}/{keteranganPinjam}"}, method = RequestMethod.POST)
    public String sendRequestFromSuperior(@PathVariable(value = "kodeBarang") String kodeBarang, @PathVariable(value = "tgPinjam") String tgPinjam, @PathVariable(value = "jumlahBarang") int jumlahBarang, @PathVariable(value = "keteranganPinjam") String keteranganPinjam){
        //sementara usernya masih static (pakai user dg id 1L)
        Transaksi transaksi = new Transaksi(userRepository.getUserById(1L), tgPinjam, barangRepository.findBarangByKode(kodeBarang), jumlahBarang, keteranganPinjam, StatusTransaksi.disetujui);
        transaksiRepository.save(transaksi);
        return "Permintaan peminjaman "+barangRepository.findBarangByKode(kodeBarang).getNama()+" sejumlah "+ jumlahBarang+ " unit berhasil";
    }

    //mendapatkan list transaksi
    @RequestMapping(value = {"employee/getOrderList/{statusOrder}", "superior/getOrderList/{statusOrder}"}, method = RequestMethod.GET)
    public List<Transaksi> getOrderList(@PathVariable(value = "statusOrder") String status){
        if(status.equalsIgnoreCase("waiting")){
            //sementara user id nya statis pakai 1L
            return transaksiRepository.findAllByUser_IdAndStatusTransaksi(1L, StatusTransaksi.menunggu);
        }
        else if(status.equalsIgnoreCase("approved")){ //terdiri dari transaksi yang berstatus diijinkan, dan diassign
            //sementara user id nya statis pakai 1L
            List<Transaksi> transaksiList = transaksiRepository.findAllByUser_IdAndStatusTransaksi(1L, StatusTransaksi.disetujui);
            //sementara user id nya statis pakai 1L
            transaksiList.addAll(transaksiRepository.findAllByUser_IdAndStatusTransaksi(1L, StatusTransaksi.diassign));
            return transaksiList;
        }
        else{ //trasaksi yang ditolak
            //sementara user id nya statis pakai 1L
            return transaksiRepository.findAllByUser_IdAndStatusTransaksi(1L, StatusTransaksi.ditolak);
        }
    }

    @GetMapping("api/transaksi/subbarang/{kodesubbarang}")
    public Transaksi transaksiPerSubBarang(@PathVariable String kodesubbarang){
      SubBarang subBarang = subBarangRepository.getSubBarangByKodeSubBarang(kodesubbarang);
      DetailTransaksi detailTransaksi = detailTransaksiRepository.getDetailTransaksiBySubBarang(subBarang);
      Transaksi transaksi = detailTransaksi.getTransaksi();
      return transaksi;
    }
}
