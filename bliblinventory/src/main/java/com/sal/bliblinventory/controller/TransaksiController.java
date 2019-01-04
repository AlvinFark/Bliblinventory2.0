package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.DetailTransaksi;
import com.sal.bliblinventory.model.StatusTransaksi;
import com.sal.bliblinventory.model.SubBarang;
import com.sal.bliblinventory.model.Transaksi;
import com.sal.bliblinventory.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    @RequestMapping(value = {"employee/requestPinjam/{idUser}/{kodeBarang}/{tgPinjam}/{jumlahBarang}/{keteranganPinjam}"}, method = RequestMethod.POST)
    public Long sendRequestFromEmployee(@PathVariable(value = "idUser") Long idUser,@PathVariable(value = "kodeBarang") String kodeBarang, @PathVariable(value = "tgPinjam") String tgPinjam, @PathVariable(value = "jumlahBarang") int jumlahBarang, @PathVariable(value = "keteranganPinjam") String keteranganPinjam){
        Transaksi transaksi = new Transaksi(userRepository.getUserById(idUser), tgPinjam, barangRepository.findBarangByKode(kodeBarang), jumlahBarang, keteranganPinjam, StatusTransaksi.menunggu);
        transaksiRepository.save(transaksi);
        return transaksi.getIdTransaksi();
    }

    //superior mengirim request pinjam
    @RequestMapping(value = {"superior/requestPinjam/{idUser}/{kodeBarang}/{tgPinjam}/{jumlahBarang}/{keteranganPinjam}"}, method = RequestMethod.POST)
    public Long sendRequestFromSuperior(@PathVariable(value = "idUser") Long idUser, @PathVariable(value = "kodeBarang") String kodeBarang, @PathVariable(value = "tgPinjam") String tgPinjam, @PathVariable(value = "jumlahBarang") int jumlahBarang, @PathVariable(value = "keteranganPinjam") String keteranganPinjam){
        Transaksi transaksi = new Transaksi(userRepository.getUserById(idUser), tgPinjam, barangRepository.findBarangByKode(kodeBarang), jumlahBarang, keteranganPinjam, StatusTransaksi.disetujui);
        transaksiRepository.save(transaksi);
        return transaksi.getIdTransaksi();
    }

    //mendapatkan list transaksi berdasarkan statusnya
    @RequestMapping(value = {"employee/getOrderList/{idUser}/{statusOrder}", "superior/getOrderList/{idUser}/{statusOrder}"}, method = RequestMethod.GET)
    public List<Transaksi> getOrderList(@PathVariable(value = "idUser") Long idUser, @PathVariable(value = "statusOrder") String status){
        if(status.equalsIgnoreCase("waiting")){
            return transaksiRepository.findAllByUser_IdAndStatusTransaksiAndIsExist(idUser, StatusTransaksi.menunggu, true);
        }
        else if(status.equalsIgnoreCase("approved")){ //terdiri dari transaksi yang berstatus diijinkan, dan diassign
            List<Transaksi> transaksiList = transaksiRepository.findAllByUser_IdAndStatusTransaksiAndIsExist(idUser, StatusTransaksi.disetujui,true);
            transaksiList.addAll(transaksiRepository.findAllByUser_IdAndStatusTransaksiAndIsExist(idUser, StatusTransaksi.diassign,true));
            return transaksiList;
        }
        else{ //trasaksi yang ditolak
            return transaksiRepository.findAllByUser_IdAndStatusTransaksiAndIsExist(idUser, StatusTransaksi.ditolak, true);
        }
    }

    //mendapatkan list permintaan pinjaman employee (dari superior)
    //hanya tampilkan yang statusnya menunggu
    @RequestMapping(value = "superior/getAllEmployeeRequest/{idUser}", method = RequestMethod.GET)
    public List<Transaksi> getAllEmployeeRequestFromSuperior(@PathVariable(value = "idUser") Long idUser) {
        return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndStatusTransaksiOrderByTgPinjam(idUser, true, StatusTransaksi.menunggu);
    }

    //mendapatkan list permintaan pinjaman employee (dari superior) dengan filter dan keyword
    //hanya tampilkan yang statusnya menunggu
    @RequestMapping(value = "superior/filterEmployeeRequest/{idUser}/{sortBy}/{searchBy}/{keyword}", method = RequestMethod.GET)
    public List<Transaksi> getEmployeeRequestFromSuperiorWithFilterAndKeyword(@PathVariable(value = "idUser") Long idUser, @PathVariable(value = "sortBy") int sortBy, @PathVariable(value = "searchBy") int searchBy, @PathVariable(value = "keyword") String keyword) {
        if(searchBy==0){ //search by Nama Karyawan yang request
            switch (sortBy){
                //sort by tgPinjam
                case 0: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByTgPinjam(idUser, true, keyword, StatusTransaksi.menunggu);
                //sort by noOrder
                case 1: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByIdTransaksi(idUser, true, keyword, StatusTransaksi.menunggu);
                //sort by namaPeminjam
                case 2: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByUser_Name(idUser, true, keyword, StatusTransaksi.menunggu);
                //sort by namaBarang
                case 3: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByBarang_Nama(idUser, true, keyword, StatusTransaksi.menunggu);
                //sort by tgOrder
                default: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByIdTransaksi(idUser, true, keyword, StatusTransaksi.menunggu);
            }
        }
        else{ //search by Nama Barang
            switch (sortBy){
                //sort by tgPinjam
                case 0: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByTgPinjam(idUser, true, keyword, StatusTransaksi.menunggu);
                //sort by noOrder
                case 1: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByIdTransaksi(idUser, true, keyword, StatusTransaksi.menunggu);
                //sort by namaPeminjam
                case 2: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByUser_Name(idUser, true, keyword, StatusTransaksi.menunggu);
                //sort by namaBarang
                case 3: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByBarang_Nama(idUser, true, keyword, StatusTransaksi.menunggu);
                //sort by tgOrder
                default: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByIdTransaksi(idUser, true, keyword, StatusTransaksi.menunggu);
            }
        }
    }

    //mendapatkan list permintaan pinjaman employee (dari superior) dengan filter
    //hanya tampilkan yang statusnya menunggu
    @RequestMapping(value = "superior/filterEmployeeRequest/{idUser}/{sortBy}/{searchBy}", method = RequestMethod.GET)
    public List<Transaksi> getEmployeeRequestFromSuperiorWithFilter(@PathVariable(value = "idUser") Long idUser, @PathVariable(value = "sortBy") int sortBy, @PathVariable(value = "searchBy") int searchBy) {
        switch (sortBy){
            //sort by tgPinjam
            case 0: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndStatusTransaksiOrderByTgPinjam(idUser,true, StatusTransaksi.menunggu);
            //sort by noOrder
            case 1: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndStatusTransaksiOrderByIdTransaksi(idUser,true, StatusTransaksi.menunggu);
            //sort by namaPeminjam
            case 2: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndStatusTransaksiOrderByUser_Name(idUser,true, StatusTransaksi.menunggu);
            //sort by namaBarang
            case 3: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndStatusTransaksiOrderByBarang_Nama(idUser,true, StatusTransaksi.menunggu);
            //sort by tgOrder
            default: return transaksiRepository.findAllByUser_SuperiorIdAndIsExistAndStatusTransaksiOrderByIdTransaksi(idUser,true, StatusTransaksi.menunggu);
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

    //get transaksi berdasarkan id transaksi
    @RequestMapping(value = "api/getTransaksiByIdTransaksi/{idTransaksi}", method = RequestMethod.GET)
    public Transaksi getTransaksiByIdTransaksi(@PathVariable(value = "idTransaksi") Long idTransaksi) {
        return transaksiRepository.findByIdTransaksi(idTransaksi);
    }

    //get transaksi berdasar kode sub barang
    @GetMapping("api/transaksi/subbarang/{kodesubbarang}")
    public Transaksi transaksiPerSubBarang(@PathVariable String kodesubbarang){
      SubBarang subBarang = subBarangRepository.getSubBarangByKodeSubBarang(kodesubbarang);
      String str = "1970-01-01 00:00:00";
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
      LocalDateTime localDateTime = LocalDateTime.parse(str, formatter);
      DetailTransaksi detailTransaksi = detailTransaksiRepository.getDetailTransaksiBySubBarangAndIsExistAndTgKembali(subBarang, true, localDateTime);
      Transaksi transaksi = detailTransaksi.getTransaksi();
      return transaksi;
    }

    //edit status transaksi jadi ditolak
    @PutMapping("superior/tolakPermintaanPinjam")
    public Transaksi tolakPermintaanPinjam(@Valid @RequestBody Transaksi transaksiRequest) {
        transaksiRequest.setStatusTransaksi(StatusTransaksi.ditolak);
        transaksiRequest.setExist(true);
        return transaksiRepository.save(transaksiRequest);
    }

    //edit status transaksi jadi disetujui
    @PutMapping("superior/setujuiPermintaanPinjam")
    public Transaksi setujuiPermintaanPinjam(@Valid @RequestBody Transaksi transaksiRequest) {
        transaksiRequest.setStatusTransaksi(StatusTransaksi.disetujui);
        transaksiRequest.setExist(true);
        return transaksiRepository.save(transaksiRequest);
    }

    @PutMapping("admin/assignPermintaanPinjam")
    public Transaksi assignPermintaanPinjam(@Valid @RequestBody Transaksi transaksiRequest) {
        transaksiRequest.setStatusTransaksi(StatusTransaksi.diassign);
        transaksiRequest.setExist(true);
        return transaksiRepository.save(transaksiRequest);
    }

    //edit isExis detail transaksi jadi false(soft delete detail transaksi)
    @PutMapping("api/editTransaksiNotExist")
    public Transaksi editTransaksiNotExist(@Valid @RequestBody Transaksi transaksiRequest) {
        transaksiRequest.setExist(false);
        return transaksiRepository.save(transaksiRequest);
    }
}
