package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.exception.AppException;
import com.sal.bliblinventory.exception.ResourceNotFoundException;
import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.model.DetailTransaksi;
import com.sal.bliblinventory.model.SubBarang;
import com.sal.bliblinventory.repository.BarangRepository;
import com.sal.bliblinventory.repository.DetailTransaksiRepository;
import com.sal.bliblinventory.repository.SubBarangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class SubBarangController {
    @Autowired
    SubBarangRepository subBarangRepository;

    @Autowired
    BarangRepository barangRepository;

    @Autowired
    DetailTransaksiRepository detailTransaksiRepository;

    //hitung semua sub barang berdasar kode barang
    @RequestMapping(value = {"employee/countAllSubBarang/{kodeBarang}", "superior/countAllSubBarang/{kodeBarang}"}, method = RequestMethod.GET)
    public int countSubBarang(@PathVariable(value = "kodeBarang") String kodeBarang){
        return subBarangRepository.countSubBarangByBarangKodeAndIsExist(kodeBarang, true);
    }

    //hitung sub barang yang tersedia berdasar kode barang
    @RequestMapping(value = {"employee/countReadySubBarang/{kodeBarang}", "superior/countReadySubBarang/{kodeBarang}"}, method = RequestMethod.GET)
    public int countReadySubBarang(@PathVariable(value = "kodeBarang") String kodeBarang){
        return subBarangRepository.countSubBarangByBarangKodeAndStatusSubBarangAndIsExist(kodeBarang, true, true);
    }

    //hitung semua sub barang berdasar kode barang
    @RequestMapping(value = {"employee/countTotalSubBarang/{kodeBarang}", "superior/countTotalSubBarang/{kodeBarang}"}, method = RequestMethod.GET)
    public int countTotalSubBarang(@PathVariable(value = "kodeBarang") String kodeBarang){
      return subBarangRepository.countSubBarangByBarangKode(kodeBarang);
    }

    //ubah status sub barang menjadi dipinjam
    @RequestMapping(value = {"superior/changeStateSubBarangToBorrowed"}, method = RequestMethod.PUT)
    public SubBarang changeStateSubBarangToBorrowed(@Valid @RequestBody SubBarang subBarangRequest){
        subBarangRequest.setStatusSubBarang(false);
        return subBarangRepository.save(subBarangRequest);
    }

    //tambahkan sub barang
    @RequestMapping(value = {"/api/barang/{kodebarang}/{kodesubbarang}"}, method = RequestMethod.POST)
    public SubBarang addSubBarang(@PathVariable("kodebarang") String kodebarang, @PathVariable("kodesubbarang") String kodesubbarang) {

      Barang barang = barangRepository.findBarangByKode(kodebarang);
      SubBarang subBarangRequest = new SubBarang(kodesubbarang, barang);
      subBarangRequest.setStatusSubBarang(true);
      return subBarangRepository.save(subBarangRequest);
    }

    //get semua sub barang berdasar kode barang
    @GetMapping("/api/barang/{kodebarang}/subbarang")
    public List<SubBarang> listSubBarang(@PathVariable String kodebarang){
      Barang barang = barangRepository.findBarangByKode(kodebarang);
      return subBarangRepository.findAllByBarangAndIsExistOrderByStatusSubBarangDesc(barang,true);
    }

    //hapus sub barang
    @PutMapping("/api/subbarang/{kodeSubBarang}")
    public String hapusSubBarang(@PathVariable String kodeSubBarang, @Valid @RequestBody SubBarang subBarang) {
      SubBarang sub = subBarangRepository.getSubBarangByKodeSubBarang(kodeSubBarang);
      String str = "1970-01-01 00:00:00";
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
      LocalDateTime localDateTime = LocalDateTime.parse(str, formatter);
      DetailTransaksi detailTransaksi = detailTransaksiRepository.getDetailTransaksiBySubBarangAndIsExistAndTgKembali(sub, true, localDateTime);
      if (detailTransaksi==null){
        sub.setExist(subBarang.getExist());
        subBarangRepository.save(sub);
        return "Barang satuan dengan kode " + kodeSubBarang + " berhasil dihapus";
      } else {
        return "Barang satuan dengan kode " + kodeSubBarang + " tidak dapat dihapus, silahkan pastikan barang tersebut tidak sedang dipinjam";
      }
    }

    //get sub barang berdasar kode sub barang
    @GetMapping("/api/getSubBarangByKodeSubBarang/{kodeSubBarang}")
    public SubBarang getSubBarangByKodeSubBarang(@PathVariable String kodeSubBarang){
        return subBarangRepository.getSubBarangByKodeSubBarang(kodeSubBarang);
    }

    //edit status sub barang menjadi readay (bollean o)
    @PutMapping("api/editStatusSubBarangReady")
    public SubBarang editStatusSubBarangReady(@Valid @RequestBody SubBarang subBarangRequest) {
        subBarangRequest.setStatusSubBarang(true);
        return subBarangRepository.save(subBarangRequest);
    }
}
