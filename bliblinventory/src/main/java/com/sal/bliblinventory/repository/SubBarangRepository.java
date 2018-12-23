package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.SubBarang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubBarangRepository extends JpaRepository<SubBarang, String> {
    int countSubBarangByBarangKode(String kodeBarang);
}
