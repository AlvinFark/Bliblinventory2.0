package com.sal.bliblinventory.model;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    //constructor
    public DetailTransaksi(){

    }

    public DetailTransaksi(Transaksi transaksi, SubBarang subBarang){
        this.transaksi = transaksi;
        this.subBarang = subBarang;
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
}
