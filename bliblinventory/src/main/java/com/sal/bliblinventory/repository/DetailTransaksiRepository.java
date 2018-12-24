package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.DetailTransaksi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailTransaksiRepository extends JpaRepository<DetailTransaksi, Long> {
}
