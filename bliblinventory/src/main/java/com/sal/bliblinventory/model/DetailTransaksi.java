package com.sal.bliblinventory.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.Instant;

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

    private Instant tgKembali;

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

    public Instant getTgKembali() {
        return tgKembali;
    }

    public void setTgKembali(Instant tgKembali) {
        this.tgKembali = tgKembali;
    }
}
