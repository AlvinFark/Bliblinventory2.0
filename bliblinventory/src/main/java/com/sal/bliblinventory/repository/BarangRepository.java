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
    List<Barang> findAllByIsExistOrderByNama(boolean isExist);
    List<Barang> findAllByIsExistOrderByKode(boolean isExist);
    List<Barang> findAllByIsExistAndCategory_IdOrderByNama(boolean isExist, Long idCategory);
    List<Barang> findAllByIsExistAndCategory_IdOrderByKode(boolean isExist, Long idCategory);
    List<Barang> findByNamaContainingAndIsExistOrderByNama(String namaBarang, boolean isExist);
    List<Barang> findByNamaContainingAndIsExistOrderByKode(String namaBarang, boolean isExist);
    List<Barang> findByNamaContainingAndIsExistAndCategory_IdOrderByNama(String namaBarang, boolean isExist, Long idCategory);
    List<Barang> findByNamaContainingAndIsExistAndCategory_IdOrderByKode(String namaBarang, boolean isExist, Long idCategory);
    List<Barang> findByCategory_NameContainingOrderByKodeDesc(String categoryId, Pageable pageable);
    int countAllByCategory_IdAndIsExist(Long categoryId, boolean isExist);
}