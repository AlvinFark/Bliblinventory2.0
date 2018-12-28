package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.Barang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BarangRepository extends JpaRepository<Barang, String> {
    Barang findBarangByKode(String kodeBarang);
    List<Barang> findAllByIsExistOrderByNama(Boolean isExist);
    List<Barang> findAllByIsExistOrderByKode(Boolean isExist);
    List<Barang> findByNamaContainingAndIsExistOrderByNama(String namaBarang, Boolean isExist);
    List<Barang> findByNamaContainingAndIsExistOrderByKode(String namaBarang, Boolean isExist);
}