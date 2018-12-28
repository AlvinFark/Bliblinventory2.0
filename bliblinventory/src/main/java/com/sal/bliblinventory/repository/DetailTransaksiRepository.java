package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.DetailTransaksi;
import com.sal.bliblinventory.model.SubBarang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailTransaksiRepository extends JpaRepository<DetailTransaksi, Long> {
  DetailTransaksi getDetailTransaksiBySubBarang(SubBarang subBarang);
}
