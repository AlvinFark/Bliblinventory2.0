package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.SubBarang;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubBarangRepository extends JpaRepository<SubBarang, String> {
    int countSubBarangByBarangKodeAndIsExist(String kodeBarang, boolean isExist);
    int countSubBarangByBarangKodeAndStatusSubBarangAndIsExist(String kodeBarang, Boolean status, boolean isExist);

    List<SubBarang> findAllByBarang_KodeAndStatusSubBarangAndIsExist(String kodeBarang, boolean statusSubBarang, Pageable jumlahBarang, boolean isExist);
}
