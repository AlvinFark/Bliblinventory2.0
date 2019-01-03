package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.DetailTransaksi;
import com.sal.bliblinventory.model.SubBarang;
import com.sal.bliblinventory.repository.DetailTransaksiRepository;
import com.sal.bliblinventory.repository.SubBarangRepository;
import com.sal.bliblinventory.repository.TransaksiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class DetailTransaksiController {
    @Autowired
    DetailTransaksiRepository detailTransaksiRepository;

    @Autowired
    SubBarangRepository subBarangRepository;

    @Autowired
    TransaksiRepository transaksiRepository;

    //buat detail transaksi
    @RequestMapping(value = {"employee/createDetailTransaksi/{kodeBarang}/{jumlahBarang}/{idTransaksi}", "superior/createDetailTransaksi/{kodeBarang}/{jumlahBarang}/{idTransaksi}"}, method = RequestMethod.POST)
    public List<SubBarang> createDetailTransaksi(@PathVariable(value = "kodeBarang") String kodeBarang, @PathVariable(value = "jumlahBarang") int jumlahBarang, @PathVariable(value = "idTransaksi") Long idTransaksi){
        Pageable limit = new PageRequest(0, jumlahBarang);
        List<SubBarang> subBarangList = subBarangRepository.findAllByBarang_KodeAndStatusSubBarangAndIsExist(kodeBarang, true, limit, true);
        //tambahkan subBarang ke detail_transaksi sejumlah yang diminta
        for(int i=0; i<subBarangList.size(); i++){
            //sementara usernya masih static (pakai user dg id 1L)
            DetailTransaksi detailTransaksi = new DetailTransaksi(transaksiRepository.findByIdTransaksi(idTransaksi), subBarangList.get(i));
            detailTransaksiRepository.save(detailTransaksi);
        }
        return subBarangList;
    }

    //get semua detail transaksi
    @GetMapping("/api/permintaan")
    public List<DetailTransaksi> getAllDetailTransaksi() {
      String str = "1970-01-01 00:00:00";
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
      LocalDateTime localDateTime = LocalDateTime.parse(str, formatter);
      return detailTransaksiRepository.getAllByIsExistAndTgKembali(true, localDateTime);
    }

    //get detail transaksi berdasar id
    @RequestMapping(value = "api/getDetailTransaksiByIdTransaksi/{idTransaksi}", method = RequestMethod.GET)
    public List<DetailTransaksi> getTransaksiByIdTransaksi(@PathVariable(value = "idTransaksi") Long idTransaksi) {
        return detailTransaksiRepository.findAllByTransaksi_IdTransaksi(idTransaksi);
    }

    //ubah status detail transaksi menjadi not exist
    @PutMapping("api/editDetailTransaksiNotExist")
    public DetailTransaksi editDetailTransaksiNotExist(@Valid @RequestBody DetailTransaksi detailTransaksiRequest) {
        detailTransaksiRequest.setExist(false);
        return detailTransaksiRepository.save(detailTransaksiRequest);
    }

    //ubah tg kembali pada detail transaksi (ketika sub barang dikembalikan)
    @PutMapping("/api/detailtransaksi/kembali/{id}")
    public String kembalikanBarang(@PathVariable Long id){
      DetailTransaksi detailTransaksi = detailTransaksiRepository.getDetailTransaksiByIdDetailTransaksi(id);
      LocalDateTime localDateTime = LocalDateTime.now();
      detailTransaksi.setTgKembali(localDateTime);
      SubBarang subBarang = detailTransaksi.getSubBarang();
      subBarang.setStatusSubBarang(true);

      detailTransaksiRepository.save(detailTransaksi);
      subBarangRepository.save(subBarang);

      return "Barang berhasil dikembalikan";
    }

    //hitung jumlah detail transaksi yang sudah dikembalikan berdasar id transaksi
    @GetMapping("/api/getJumlahDikembalikanByIdTransaksi/{idTransaksi}")
    public int getJumlahDikembalikanByIdTransaksi(@PathVariable(value = "idTransaksi") Long idTransaksi) {
        String str = "1970-01-01 00:00:00";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime localDateTime = LocalDateTime.parse(str, formatter);
        return detailTransaksiRepository.countByTransaksi_IdTransaksiAndTgKembaliNotAndIsExist(idTransaksi, localDateTime, true);
    }
}
