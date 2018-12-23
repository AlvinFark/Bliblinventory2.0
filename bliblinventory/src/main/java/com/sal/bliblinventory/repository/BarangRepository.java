package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.Barang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BarangRepository extends JpaRepository<Barang, String> {
    Barang findBarangByKode(String kodeBarang);
    List<Barang> findAllByOrderByNama();
    List<Barang> findAllByOrderByKode();
    List<Barang> findByNamaContainingOrderByNama(String namaBarang);
    List<Barang> findByNamaContainingOrderByKode(String namaBarang);
}