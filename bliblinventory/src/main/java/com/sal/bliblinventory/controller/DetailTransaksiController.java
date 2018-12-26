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

import java.util.List;

@RestController
public class DetailTransaksiController {
    @Autowired
    DetailTransaksiRepository detailTransaksiRepository;

    @Autowired
    SubBarangRepository subBarangRepository;

    @Autowired
    TransaksiRepository transaksiRepository;

    @RequestMapping(value = {"employee/createDetailTransaksi/{kodeBarang}/{jumlahBarang}", "superior/createDetailTransaksi/{kodeBarang}/{jumlahBarang}"}, method = RequestMethod.POST)
    public String createDetailTransaksi(Model md, @PathVariable(value = "kodeBarang") String kodeBarang, @PathVariable(value = "jumlahBarang") int jumlahBarang){
        Pageable limit = new PageRequest(0, jumlahBarang);
        List<SubBarang> subBarangList = subBarangRepository.findAllByBarang_KodeAndStatusSubBarang(kodeBarang, true, limit);
        for(int i=0; i<subBarangList.size(); i++){
            //sementara usernya masih static (pakai user dg id 1L)
            DetailTransaksi detailTransaksi = new DetailTransaksi(transaksiRepository.findFirstByUser_IdOrderByIdTransaksiDesc(1L), subBarangList.get(i));
            detailTransaksiRepository.save(detailTransaksi);
        }
        return "berhasil";
    }
}
