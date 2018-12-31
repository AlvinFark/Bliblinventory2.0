package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.PermintaanPembelian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermintaanPembelianRepository extends JpaRepository<PermintaanPembelian, Long> {
}
