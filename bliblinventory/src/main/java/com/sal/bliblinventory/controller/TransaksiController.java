package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.DetailTransaksi;
import com.sal.bliblinventory.model.StatusTransaksi;
import com.sal.bliblinventory.model.SubBarang;
import com.sal.bliblinventory.model.Transaksi;
import com.sal.bliblinventory.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public Long sendRequestFromEmployee(@PathVariable(value = "kodeBarang") String kodeBarang, @PathVariable(value = "tgPinjam") String tgPinjam, @PathVariable(value = "jumlahBarang") int jumlahBarang, @PathVariable(value = "keteranganPinjam") String keteranganPinjam){
        //sementara usernya masih static (pakai user dg id 1L)
        Transaksi transaksi = new Transaksi(userRepository.getUserById(1L), tgPinjam, barangRepository.findBarangByKode(kodeBarang), jumlahBarang, keteranganPinjam, StatusTransaksi.menunggu);
        transaksiRepository.save(transaksi);
        return transaksi.getIdTransaksi();
        //return "Permintaan peminjaman "+barangRepository.findBarangByKode(kodeBarang).getNama()+" sejumlah "+ jumlahBarang+ " unit berhasil";
    }

    //superior mengirim request pinjam
    @RequestMapping(value = {"superior/requestPinjam/{kodeBarang}/{tgPinjam}/{jumlahBarang}/{keteranganPinjam}"}, method = RequestMethod.POST)
    public Long sendRequestFromSuperior(@PathVariable(value = "kodeBarang") String kodeBarang, @PathVariable(value = "tgPinjam") String tgPinjam, @PathVariable(value = "jumlahBarang") int jumlahBarang, @PathVariable(value = "keteranganPinjam") String keteranganPinjam){
        //sementara usernya masih static (pakai user dg id 1L)
        Transaksi transaksi = new Transaksi(userRepository.getUserById(1L), tgPinjam, barangRepository.findBarangByKode(kodeBarang), jumlahBarang, keteranganPinjam, StatusTransaksi.disetujui);
        transaksiRepository.save(transaksi);
        return transaksi.getIdTransaksi();
        //return "Permintaan peminjaman "+barangRepository.findBarangByKode(kodeBarang).getNama()+" sejumlah "+ jumlahBarang+ " unit berhasil";
    }

    //mendapatkan list transaksi
    @RequestMapping(value = {"employee/getOrderList/{statusOrder}", "superior/getOrderList/{statusOrder}"}, method = RequestMethod.GET)
    public List<Transaksi> getOrderList(@PathVariable(value = "statusOrder") String status){
        if(status.equalsIgnoreCase("waiting")){
            //sementara user id nya statis pakai 1L
            return transaksiRepository.findAllByUser_IdAndStatusTransaksiAndIsExist(1L, StatusTransaksi.menunggu, true);
        }
        else if(status.equalsIgnoreCase("approved")){ //terdiri dari transaksi yang berstatus diijinkan, dan diassign
            //sementara user id nya statis pakai 1L
            List<Transaksi> transaksiList = transaksiRepository.findAllByUser_IdAndStatusTransaksiAndIsExist(1L, StatusTransaksi.disetujui,true);
            //sementara user id nya statis pakai 1L
            transaksiList.addAll(transaksiRepository.findAllByUser_IdAndStatusTransaksiAndIsExist(1L, StatusTransaksi.diassign,true));
            return transaksiList;
        }
        else{ //trasaksi yang ditolak
            //sementara user id nya statis pakai 1L
            return transaksiRepository.findAllByUser_IdAndStatusTransaksiAndIsExist(1L, StatusTransaksi.ditolak, true);
        }
    }

    //mendapatkan list permintaan pinjaman employee (dari superior)
    //hanya tampilkan yang statusnya menunggu
    @RequestMapping(value = "superior/getAllEmployeeRequest", method = RequestMethod.GET)
    public List<Transaksi> getAllEmployeeRequestFromSuperior() {
        //sementara pakai user id statis 3L
        return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndStatusTransaksiOrderByTgPinjam(3L, true, StatusTransaksi.menunggu);
    }

    //mendapatkan list permintaan pinjaman employee (dari superior) dengan filter dan keyword
    //hanya tampilkan yang statusnya menunggu
    @RequestMapping(value = "superior/filterEmployeeRequest/{sortBy}/{searchBy}/{keyword}", method = RequestMethod.GET)
    public List<Transaksi> getEmployeeRequestFromSuperiorWithFilterAndKeyword(@PathVariable(value = "sortBy") int sortBy, @PathVariable(value = "searchBy") int searchBy, @PathVariable(value = "keyword") String keyword) {
        //sementara pakai user id statis 3L
        if(searchBy==0){ //search by Nama Karyawan yang request
            switch (sortBy){
                //sort by tgPinjam
                case 0: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByTgPinjam(3L, true, keyword, StatusTransaksi.menunggu);
                //sort by noOrder
                case 1: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByIdTransaksi(3L, true, keyword, StatusTransaksi.menunggu);
                //sort by namaPeminjam
                case 2: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByUser_Name(3L, true, keyword, StatusTransaksi.menunggu);
                //sort by namaBarang
                case 3: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByBarang_Nama(3L, true, keyword, StatusTransaksi.menunggu);
                //sort by tgOrder
                default: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByIdTransaksi(3L, true, keyword, StatusTransaksi.menunggu);
            }
        }
        else{ //search by Nama Barang
            switch (sortBy){
                //sort by tgPinjam
                case 0: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByTgPinjam(3L, true, keyword, StatusTransaksi.menunggu);
                //sort by noOrder
                case 1: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByIdTransaksi(3L, true, keyword, StatusTransaksi.menunggu);
                //sort by namaPeminjam
                case 2: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByUser_Name(3L, true, keyword, StatusTransaksi.menunggu);
                //sort by namaBarang
                case 3: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByBarang_Nama(3L, true, keyword, StatusTransaksi.menunggu);
                //sort by tgOrder
                default: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByIdTransaksi(3L, true, keyword, StatusTransaksi.menunggu);
            }
        }
    }

    //mendapatkan list permintaan pinjaman employee (dari superior) dengan filter
    //hanya tampilkan yang statusnya menunggu
    @RequestMapping(value = "superior/filterEmployeeRequest/{sortBy}/{searchBy}", method = RequestMethod.GET)
    public List<Transaksi> getEmployeeRequestFromSuperiorWithFilter(@PathVariable(value = "sortBy") int sortBy, @PathVariable(value = "searchBy") int searchBy) {
        //sementara pakai user id statis 3L
        switch (sortBy){
            //sort by tgPinjam
            case 0: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndStatusTransaksiOrderByTgPinjam(3L,true, StatusTransaksi.menunggu);
            //sort by noOrder
            case 1: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndStatusTransaksiOrderByIdTransaksi(3L,true, StatusTransaksi.menunggu);
            //sort by namaPeminjam
            case 2: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndStatusTransaksiOrderByUser_Name(3L,true, StatusTransaksi.menunggu);
            //sort by namaBarang
            case 3: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndStatusTransaksiOrderByBarang_Nama(3L,true, StatusTransaksi.menunggu);
            //sort by tgOrder
            default: return transaksiRepository.findAllByUser_Superior_IdAndIsExistAndStatusTransaksiOrderByIdTransaksi(3L,true, StatusTransaksi.menunggu);
        }
    }

    //mendapatkan list permintaan pinjaman employee & superior (dari admin)
    //hanya tampilkan yang statusnya disetujui
    @RequestMapping(value = "admin/getAllEmployeeRequest", method = RequestMethod.GET)
    public List<Transaksi> getAllEmployeeRequestFromAdmin() {
        return transaksiRepository.findAllByIsExistAndStatusTransaksiOrderByTgPinjam(true, StatusTransaksi.disetujui);
    }

    //mendapatkan list permintaan pinjaman employee dan superior (dari admin) dengan filter dan keyword
    //hanya tampilkan yang statusnya disetujui
    @RequestMapping(value = "admin/filterEmployeeRequest/{sortBy}/{searchBy}/{keyword}", method = RequestMethod.GET)
    public List<Transaksi> getEmployeeRequestFromAdminWithFilterAndKeyword(@PathVariable(value = "sortBy") int sortBy, @PathVariable(value = "searchBy") int searchBy, @PathVariable(value = "keyword") String keyword) {
        if(searchBy==0){ //search by Nama Karyawan yang request
            switch (sortBy){
                //sort by tgPinjam
                case 0: return transaksiRepository.findAllByIsExistAndUser_NameContainingAndStatusTransaksiOrderByTgPinjam(true, keyword, StatusTransaksi.disetujui);
                //sort by noOrder
                case 1: return transaksiRepository.findAllByIsExistAndUser_NameContainingAndStatusTransaksiOrderByIdTransaksi(true, keyword, StatusTransaksi.disetujui);
                //sort by namaPeminjam
                case 2: return transaksiRepository.findAllByIsExistAndUser_NameContainingAndStatusTransaksiOrderByUser_Name(true, keyword, StatusTransaksi.disetujui);
                //sort by namaBarang
                case 3: return transaksiRepository.findAllByIsExistAndUser_NameContainingAndStatusTransaksiOrderByBarang_Nama(true, keyword, StatusTransaksi.disetujui);
                //sort by tgOrder
                default: return transaksiRepository.findAllByIsExistAndUser_NameContainingAndStatusTransaksiOrderByIdTransaksi(true, keyword, StatusTransaksi.disetujui);
            }
        }
        else{ //search by Nama Barang
            switch (sortBy){
                //sort by tgPinjam
                case 0: return transaksiRepository.findAllByIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByTgPinjam(true, keyword, StatusTransaksi.disetujui);
                //sort by noOrder
                case 1: return transaksiRepository.findAllByIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByIdTransaksi(true, keyword, StatusTransaksi.disetujui);
                //sort by namaPeminjam
                case 2: return transaksiRepository.findAllByIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByUser_Name(true, keyword, StatusTransaksi.disetujui);
                //sort by namaBarang
                case 3: return transaksiRepository.findAllByIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByBarang_Nama(true, keyword, StatusTransaksi.disetujui);
                //sort by tgOrder
                default: return transaksiRepository.findAllByIsExistAndUser_NameContainingAndStatusTransaksiOrderByIdTransaksi(true, keyword, StatusTransaksi.disetujui);
            }
        }
    }

    //mendapatkan list permintaan pinjaman employee dan superior (dari admin) dengan filter
    //hanya tampilkan yang statusnya disetujui
    @RequestMapping(value = "admin/filterEmployeeRequest/{sortBy}/{searchBy}", method = RequestMethod.GET)
    public List<Transaksi> getEmployeeRequestFromAdminWithFilter(@PathVariable(value = "sortBy") int sortBy, @PathVariable(value = "searchBy") int searchBy) {
        switch (sortBy){
            //sort by tgPinjam
            case 0: return transaksiRepository.findAllByIsExistAndStatusTransaksiOrderByTgPinjam(true, StatusTransaksi.disetujui);
            //sort by noOrder
            case 1: return transaksiRepository.findAllByIsExistAndStatusTransaksiOrderByIdTransaksi(true, StatusTransaksi.disetujui);
            //sort by namaPeminjam
            case 2: return transaksiRepository.findAllByIsExistAndStatusTransaksiOrderByUser_Name(true, StatusTransaksi.disetujui);
            //sort by namaBarang
            case 3: return transaksiRepository.findAllByIsExistAndStatusTransaksiOrderByBarang_Nama(true, StatusTransaksi.disetujui);
            //sort by tgOrder
            default: return transaksiRepository.findAllByIsExistAndStatusTransaksiOrderByIdTransaksi(true, StatusTransaksi.disetujui);
        }
    }

    @RequestMapping(value = "api/getTransaksiByIdTransaksi/{idTransaksi}", method = RequestMethod.GET)
    public Transaksi getTransaksiByIdTransaksi(@PathVariable(value = "idTransaksi") Long idTransaksi) {
        return transaksiRepository.findByIdTransaksi(idTransaksi);
    }

    @GetMapping("api/transaksi/subbarang/{kodesubbarang}")
    public Transaksi transaksiPerSubBarang(@PathVariable String kodesubbarang){
      SubBarang subBarang = subBarangRepository.getSubBarangByKodeSubBarang(kodesubbarang);
      DetailTransaksi detailTransaksi = detailTransaksiRepository.getDetailTransaksiBySubBarang(subBarang);
      Transaksi transaksi = detailTransaksi.getTransaksi();
      return transaksi;
    }

    @PutMapping("superior/tolakPermintaanPinjam")
    public Transaksi tolakPermintaanPinjam(@Valid @RequestBody Transaksi transaksiRequest) {
        transaksiRequest.setStatusTransaksi(StatusTransaksi.ditolak);
        transaksiRequest.setExist(true);
        return transaksiRepository.save(transaksiRequest);
    }

    @PutMapping("superior/setujuiPermintaanPinjam")
    public Transaksi setujuiPermintaanPinjam(@Valid @RequestBody Transaksi transaksiRequest) {
        transaksiRequest.setStatusTransaksi(StatusTransaksi.disetujui);
        transaksiRequest.setExist(true);
        return transaksiRepository.save(transaksiRequest);
    }

    @PutMapping("api/editTransaksiNotExist")
    public Transaksi editTransaksiNotExist(@Valid @RequestBody Transaksi transaksiRequest) {
        transaksiRequest.setExist(false);
        return transaksiRepository.save(transaksiRequest);
    }
}
