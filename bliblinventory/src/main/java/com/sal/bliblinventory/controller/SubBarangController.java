package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.exception.AppException;
import com.sal.bliblinventory.exception.ResourceNotFoundException;
import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.model.SubBarang;
import com.sal.bliblinventory.repository.BarangRepository;
import com.sal.bliblinventory.repository.SubBarangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class SubBarangController {
    @Autowired
    SubBarangRepository subBarangRepository;

    @Autowired
    BarangRepository barangRepository;

    @RequestMapping(value = {"employee/countAllSubBarang/{kodeBarang}", "superior/countAllSubBarang/{kodeBarang}"}, method = RequestMethod.GET)
    public int countSubBarang(@PathVariable(value = "kodeBarang") String kodeBarang){
        return subBarangRepository.countSubBarangByBarangKodeAndIsExist(kodeBarang, true);
    }

    @RequestMapping(value = {"employee/countReadySubBarang/{kodeBarang}", "superior/countReadySubBarang/{kodeBarang}"}, method = RequestMethod.GET)
    public int countReadySubBarang(@PathVariable(value = "kodeBarang") String kodeBarang){
        return subBarangRepository.countSubBarangByBarangKodeAndStatusSubBarangAndIsExist(kodeBarang, true, true);
    }

    @RequestMapping(value = {"superior/changeStateSubBarangToBorrowed"}, method = RequestMethod.PUT)
    public SubBarang changeStateSubBarangToBorrowed(@Valid @RequestBody SubBarang subBarangRequest){
        subBarangRequest.setStatusSubBarang(false);
        return subBarangRepository.save(subBarangRequest);
    }

    @RequestMapping(value = {"/api/barang/{kodebarang}/{kodesubbarang}"}, method = RequestMethod.POST)
    public SubBarang addSubBarang(@PathVariable("kodebarang") String kodebarang, @PathVariable("kodesubbarang") String kodesubbarang) {

      Barang barang = barangRepository.findBarangByKode(kodebarang);
      SubBarang subBarangRequest = new SubBarang(kodesubbarang, barang);
      subBarangRequest.setStatusSubBarang(true);
      return subBarangRepository.save(subBarangRequest);
    }

    @GetMapping("/api/barang/{kodebarang}/subbarang")
    public List<SubBarang> listSubBarang(@PathVariable String kodebarang){
      Barang barang = barangRepository.findBarangByKode(kodebarang);
      return subBarangRepository.findAllByBarangAndIsExistOrderByStatusSubBarangDesc(barang,true);
    }

    @PutMapping("/api/subbarang/{kodeSubBarang}")
    public SubBarang editSubBarang(@PathVariable String kodeSubBarang, @Valid @RequestBody SubBarang subBarang) {
      SubBarang sub = subBarangRepository.getSubBarangByKodeSubBarang(kodeSubBarang);
      sub.setExist(subBarang.getExist());
      return subBarangRepository.save(sub);
    }

    @GetMapping("/api/getSubBarangByKodeSubBarang/{kodeSubBarang}")
    public SubBarang getSubBarangByKodeSubBarang(@PathVariable String kodeSubBarang){
        return subBarangRepository.getSubBarangByKodeSubBarang(kodeSubBarang);
    }

    @PutMapping("api/editStatusSubBarangReady")
    public SubBarang editStatusSubBarangReady(@Valid @RequestBody SubBarang subBarangRequest) {
        subBarangRequest.setStatusSubBarang(true);
        return subBarangRepository.save(subBarangRequest);
    }
}
