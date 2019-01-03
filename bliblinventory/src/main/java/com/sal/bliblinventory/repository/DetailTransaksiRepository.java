package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.DetailTransaksi;
import com.sal.bliblinventory.model.SubBarang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DetailTransaksiRepository extends JpaRepository<DetailTransaksi, Long> {
  DetailTransaksi getDetailTransaksiBySubBarangAndIsExistAndTgKembali(SubBarang subBarang, boolean isExist, LocalDateTime tgKembali);

  List<DetailTransaksi> getAllByIsExistAndTgKembali(boolean isExist, LocalDateTime tgKembali);

  DetailTransaksi getDetailTransaksiBySubBarangAndTransaksi_IsExist(SubBarang subBarang, boolean isExist);

  List<DetailTransaksi> getAllByTransaksi_IsExist(boolean isExist);

  List<DetailTransaksi> findAllByTransaksi_IdTransaksi(Long idTransaksi);

  DetailTransaksi getDetailTransaksiByIdDetailTransaksi(Long idDetailTransaksi);

  DetailTransaksi getDetailTransaksiBySubBarang_KodeSubBarangAndTgKembaliAndIsExist(String kodeSubBarang, LocalDateTime tgKembali, boolean isExist);

  int countByTransaksi_IdTransaksiAndTgKembaliNotAndIsExist(Long idTransaksi, LocalDateTime tgKembali, boolean isExist);
}
