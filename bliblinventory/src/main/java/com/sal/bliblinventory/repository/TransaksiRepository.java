package com.sal.bliblinventory.repository;

import com.sal.bliblinventory.model.StatusTransaksi;
import com.sal.bliblinventory.model.Transaksi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransaksiRepository extends JpaRepository<Transaksi, Long> {
    Transaksi findByIdTransaksi(Long idTransaksi);
    Transaksi findFirstByUser_IdAndIsExistOrderByIdTransaksiDesc(Long userId, boolean isExist);
    List<Transaksi> findAllByUser_IdAndStatusTransaksiAndIsExist(Long userId, StatusTransaksi statusTransaksi, boolean isExist);

    //yang status transaksinya menunggu
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndStatusTransaksiOrderByTgPinjam(Long superiorId, boolean isExist, StatusTransaksi statusTransaksi);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndStatusTransaksiOrderByIdTransaksi(Long superiorId, boolean isExist, StatusTransaksi statusTransaksi);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndStatusTransaksiOrderByBarang_Nama(Long superiorId, boolean isExist, StatusTransaksi statusTransaksi);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndStatusTransaksiOrderByUser_Name(Long superiorId, boolean isExist, StatusTransaksi statusTransaksi);

    //search by user_name dan yang status transaksinya menunggu
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByTgPinjam(Long superiorId, boolean isExist, String userName, StatusTransaksi statusTransaksi);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByIdTransaksi(Long superiorId, boolean isExist, String userName, StatusTransaksi statusTransaksi);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByBarang_Nama(Long superiorId, boolean isExist, String userName, StatusTransaksi statusTransaksi);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndUser_NameContainingAndStatusTransaksiOrderByUser_Name(Long superiorId, boolean isExist, String userName, StatusTransaksi statusTransaksi);

    //search by barang_nama dan yang status transaksinya menunggu
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByTgPinjam(Long superiorId, boolean isExist, String namaBarang, StatusTransaksi statusTransaksi);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByIdTransaksi(Long superiorId, boolean isExist, String namaBarang, StatusTransaksi statusTransaksi);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByBarang_Nama(Long superiorId, boolean isExist, String namaBarang, StatusTransaksi statusTransaksi);
    List<Transaksi> findAllByUser_Superior_IdAndIsExistAndBarang_NamaContainingAndStatusTransaksiOrderByUser_Name(Long superiorId, boolean isExist, String namaBarang, StatusTransaksi statusTransaksi);
}
