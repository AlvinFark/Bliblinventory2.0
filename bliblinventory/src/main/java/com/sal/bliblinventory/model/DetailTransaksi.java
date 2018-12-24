package com.sal.bliblinventory.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "detailTransaksi")
public class DetailTransaksi {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idDetailTransaksi;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_transaksi", nullable=false)
    private Transaksi transaksi;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "kode_sub_barang", nullable=false)
    private SubBarang subBarang;

    private Timestamp tgKembali;

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

    public Timestamp getTgKembali() {
        return tgKembali;
    }

    public void setTgKembali(Timestamp tgKembali) {
        this.tgKembali = tgKembali;
    }
}
