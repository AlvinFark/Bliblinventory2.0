package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.SubBarang;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubBarangRepository extends JpaRepository<SubBarang, String> {
    int countSubBarangByBarangKode(String kodeBarang);
    int countSubBarangByBarangKodeAndStatusSubBarang(String kodeBarang, Boolean status);

    List<SubBarang> findAllByBarang_KodeAndStatusSubBarang(String kodeBarang, boolean statusSubBarang, Pageable jumlahBarang);
}
