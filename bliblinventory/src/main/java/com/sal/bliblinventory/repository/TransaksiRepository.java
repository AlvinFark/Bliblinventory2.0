package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.Transaksi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransaksiRepository extends JpaRepository<Transaksi, Long> {
    Transaksi findFirstByUser_IdOrderByIdTransaksiDesc(Long userId);
}
