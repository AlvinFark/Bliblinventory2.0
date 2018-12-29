package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.DetailTransaksi;
import com.sal.bliblinventory.model.SubBarang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailTransaksiRepository extends JpaRepository<DetailTransaksi, Long> {
  DetailTransaksi getDetailTransaksiBySubBarang(SubBarang subBarang);

  List<DetailTransaksi> getAllByTransaksi_User_NameContainingAndIsExistOrderByTransaksi_User_Name(String name, boolean isExist);
  List<DetailTransaksi> getAllByTransaksi_Barang_NamaContainingAndIsExistOrderByTransaksi_User_Name(String name, boolean isExist);
  List<DetailTransaksi> getAllByTransaksi_User_NameContainingAndIsExistOrderByTransaksi_Barang_Nama(String name, boolean isExist);
  List<DetailTransaksi> getAllByTransaksi_Barang_NamaContainingAndIsExistOrderByTransaksi_Barang_Nama(String name, boolean isExist);

  List<DetailTransaksi> getAllByIsExist(boolean isExist);

}
