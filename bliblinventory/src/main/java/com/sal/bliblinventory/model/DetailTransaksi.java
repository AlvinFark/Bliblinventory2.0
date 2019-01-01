package com.sal.bliblinventory.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "detailTransaksi")
public class DetailTransaksi {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idDetailTransaksi;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_transaksi", nullable=false)
    private Transaksi transaksi;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "kode_sub_barang", nullable=false)
    private SubBarang subBarang;

    private LocalDateTime tgKembali;

    private boolean isExist;

    //constructor
    public DetailTransaksi(){

    }

    public DetailTransaksi(Transaksi transaksi, SubBarang subBarang){
        this.transaksi = transaksi;
        this.subBarang = subBarang;
        this.isExist = true;
        String str = "1970-01-01 00:00:00";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.tgKembali = LocalDateTime.parse(str, formatter);
    }

    //getter setter
    public Long getIdDetailTransaksi() {
        return idDetailTransaksi;
    }

    public void setIdDetailTransaksi(Long idDetailTransaksi) {
        this.idDetailTransaksi = idDetailTransaksi;
    }

    public Transaksi getTransaksi() {
        return transaksi;
    }

    public void setTransaksi(Transaksi transaksi) {
        this.transaksi = transaksi;
    }

    public SubBarang getSubBarang() {
        return subBarang;
    }

    public void setSubBarang(SubBarang subBarang) {
        this.subBarang = subBarang;
    }

    public LocalDateTime getTgKembali() {
        return tgKembali;
    }

    public void setTgKembali(LocalDateTime tgKembali) {
        this.tgKembali = tgKembali;
    }

    public boolean isExist() {
        return isExist;
    }

    public void setExist(boolean exist) {
        isExist = exist;
    }
}
