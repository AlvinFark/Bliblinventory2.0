package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.PermintaanPembelian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermintaanPembelianRepository extends JpaRepository<PermintaanPembelian, Long> {
    List<PermintaanPembelian> findAllByIsBoughtAndIsExist(boolean isBought, boolean isExist);
    PermintaanPembelian getPermintaanPembelianByIdPermintaanPembelian(Long idPermintaanPembelian);

    //sort by id, nama user, nama barang
    List<PermintaanPembelian> findAllByIsBoughtAndIsExistOrderByIdPermintaanPembelian(boolean isBought, boolean isExist);
    List<PermintaanPembelian> findAllByIsBoughtAndIsExistOrderByUser_Name(boolean isBought, boolean isExist);
    List<PermintaanPembelian> findAllByIsBoughtAndIsExistOrderByNamaBarang(boolean isBought, boolean isExist);

    //search by user_name
    List<PermintaanPembelian> findAllByIsBoughtAndIsExistAndUser_NameContainingOrderByIdPermintaanPembelian(boolean isBought, boolean isExist, String namaKaryawan);
    List<PermintaanPembelian> findAllByIsBoughtAndIsExistAndUser_NameContainingOrderByUser_Name(boolean isBought, boolean isExist, String namaKaryawan);
    List<PermintaanPembelian> findAllByIsBoughtAndIsExistAndUser_NameContainingOrderByNamaBarang(boolean isBought, boolean isExist, String namaKaryawan);

    //search by nama barang
    List<PermintaanPembelian> findAllByIsBoughtAndIsExistAndNamaBarangContainingOrderByIdPermintaanPembelian(boolean isBought, boolean isExist, String namaBarang);
    List<PermintaanPembelian> findAllByIsBoughtAndIsExistAndNamaBarangContainingOrderByUser_Name(boolean isBought, boolean isExist, String namaBarang);
    List<PermintaanPembelian> findAllByIsBoughtAndIsExistAndNamaBarangContainingOrderByNamaBarang(boolean isBought, boolean isExist, String namaBarang);
}
