package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.PermintaanPembelian;
import com.sal.bliblinventory.repository.CategoryRepository;
import com.sal.bliblinventory.repository.PermintaanPembelianRepository;
import com.sal.bliblinventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class PermintaanPembelianController {
    @Autowired
    PermintaanPembelianRepository permintaanPembelianRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @RequestMapping(value = "api/createPermintaanPembelian/{namaBarang}/{idKategori}/{jumlah}/{keterangan}", method = RequestMethod.POST)
    public PermintaanPembelian createPermintaanPembelian(@PathVariable(value = "namaBarang") String namaBarang, @PathVariable(value = "idKategori") Long idKategori, @PathVariable(value = "jumlah") int jumlah, @PathVariable(value = "keterangan") String keterangan){
        //sementara usernya masih static (pakai user dg id 1L)
        PermintaanPembelian permintaanPembelian = new PermintaanPembelian(namaBarang, categoryRepository.getCategoryById(idKategori), jumlah, keterangan, userRepository.getUserById(1L));
        return permintaanPembelianRepository.save(permintaanPembelian);
    }

    @RequestMapping(value = "api/getAllPemintaanPembelianBelumDibeli", method = RequestMethod.GET)
    public List<PermintaanPembelian> getAllPemintaanPembelianBelumDibeli() {
        return permintaanPembelianRepository.findAllByIsBoughtAndIsExist(false, true);
    }

    @RequestMapping(value = "api/getPermintaanPembelianById/{idPermintaanPembelian}", method = RequestMethod.GET)
    public PermintaanPembelian getPermintaanPembelianById(@PathVariable(value = "idPermintaanPembelian") Long idPermintaanPembelian) {
        return permintaanPembelianRepository.getPermintaanPembelianByIdPermintaanPembelian(idPermintaanPembelian);
    }

    @RequestMapping(value = "api/filterPermintaanPembelian/{sortBy}/{searchBy}/{keyword}", method = RequestMethod.GET)
    public List<PermintaanPembelian> filterPermintaanPembelianWithKeyword(@PathVariable(value = "sortBy") int sortBy, @PathVariable(value = "searchBy") int searchBy, @PathVariable(value = "keyword") String keyword) {
        if(searchBy==0){ //search by Nama Karyawan yang request
            switch (sortBy){
                //sort by noOrder
                case 0: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistAndUser_NameContainingOrderByIdPermintaanPembelian(false, true, keyword);
                //sort by namaKaryawan
                case 1: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistAndUser_NameContainingOrderByUser_Name(false, true, keyword);
                //sort by namaBarang
                case 2: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistAndUser_NameContainingOrderByNamaBarang(false, true, keyword);
                //sort by tgOrder
                default: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistAndUser_NameContainingOrderByIdPermintaanPembelian(false, true, keyword);
            }
        }
        else{ //search by Nama Barang
            switch (sortBy){
                //sort by noOrder
                case 0: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistAndNamaBarangContainingOrderByIdPermintaanPembelian(false, true, keyword);
                //sort by namaKaryawan
                case 1: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistAndNamaBarangContainingOrderByUser_Name(false, true, keyword);
                //sort by namaBarang
                case 2: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistAndNamaBarangContainingOrderByNamaBarang(false, true, keyword);
                //sort by tgOrder
                default: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistAndNamaBarangContainingOrderByIdPermintaanPembelian(false, true, keyword);
            }
        }
    }

    @RequestMapping(value = "api/filterPermintaanPembelian/{sortBy}/{searchBy}", method = RequestMethod.GET)
    public List<PermintaanPembelian> filterPermintaanPembelianWithoutKeyword(@PathVariable(value = "sortBy") int sortBy, @PathVariable(value = "searchBy") int searchBy) {
        switch (sortBy){
            //sort by noOrder
            case 0: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistOrderByIdPermintaanPembelian(false, true);
            //sort by namaKaryawan
            case 1: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistOrderByUser_Name(false, true);
            //sort by namaBarang
            case 2: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistOrderByNamaBarang(false, true);
            //sort by tgOrder
            default: return permintaanPembelianRepository.findAllByIsBoughtAndIsExistOrderByIdPermintaanPembelian(false, true);
        }
    }

    @PutMapping("api/updateIsBoughtPermintaanPembelian")
    public PermintaanPembelian tolakPermintaanPinjam(@Valid @RequestBody PermintaanPembelian permintaanPembelianRequest) {
        permintaanPembelianRequest.setBought(true);
        permintaanPembelianRequest.setExist(true);
        return permintaanPembelianRepository.save(permintaanPembelianRequest);
    }
}
