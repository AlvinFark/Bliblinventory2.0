package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.StatusTransaksi;
import com.sal.bliblinventory.model.Transaksi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransaksiRepository extends JpaRepository<Transaksi, Long> {
    Transaksi findFirstByUser_IdAndIsExistOrderByIdTransaksiDesc(Long userId, boolean isExist);
    List<Transaksi> findAllByUser_IdAndStatusTransaksiAndIsExist(Long userId, StatusTransaksi statusTransaksi, boolean isExist);

    List<Transaksi> findAllByUser_Superior_IdAndIsExistOrderByTgPinjam(Long superiorId, boolean isExist);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistOrderByIdTransaksi(Long superiorId, boolean isExist);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistOrderByBarang_Nama(Long superiorId, boolean isExist);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistOrderByUser_Name(Long superiorId, boolean isExist);

    //search by user_name
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndUser_NameContainingOrderByTgPinjam(Long superiorId, boolean isExist, String userName);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndUser_NameContainingOrderByIdTransaksi(Long superiorId, boolean isExist, String userName);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndUser_NameContainingOrderByBarang_Nama(Long superiorId, boolean isExist, String userName);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndUser_NameContainingOrderByUser_Name(Long superiorId, boolean isExist, String userName);

    //search by barang_nama
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingOrderByTgPinjam(Long superiorId, boolean isExist, String namaBarang);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingOrderByIdTransaksi(Long superiorId, boolean isExist, String namaBarang);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingOrderByBarang_Nama(Long superiorId, boolean isExist, String namaBarang);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingOrderByUser_Name(Long superiorId, boolean isExist, String namaBarang);
}
