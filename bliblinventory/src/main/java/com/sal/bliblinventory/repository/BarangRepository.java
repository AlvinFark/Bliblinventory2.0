package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.Barang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface BarangRepository extends JpaRepository<Barang, String> {
    Barang findBarangByKode(String kodeBarang);
    Barang findBarangByNama(String nama);
    List<Barang> findAllByIsExistOrderByNama(Boolean isExist);
    List<Barang> findAllByIsExistOrderByKode(Boolean isExist);
    List<Barang> findAllByIsExistAndCategory_IdOrderByNama(Boolean isExist, Long idCategory);
    List<Barang> findAllByIsExistAndCategory_IdOrderByKode(Boolean isExist, Long idCategory);
    List<Barang> findByNamaContainingAndIsExistOrderByNama(String namaBarang, Boolean isExist);
    List<Barang> findByNamaContainingAndIsExistOrderByKode(String namaBarang, Boolean isExist);
    List<Barang> findByNamaContainingAndIsExistAndCategory_IdOrderByNama(String namaBarang, Boolean isExist, Long idCategory);
    List<Barang> findByNamaContainingAndIsExistAndCategory_IdOrderByKode(String namaBarang, Boolean isExist, Long idCategory);
    List<Barang> findByCategory_NameContainingOrderByKodeDesc(String categoryId, Pageable pageable);

}